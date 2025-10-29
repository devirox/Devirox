import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "portfolio_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 days
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

let fallbackSecret: Uint8Array | null = null;
let cachedCryptoKey: Promise<CryptoKey> | null = null;

function getSecretKeyBytes() {
  const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;
  if (secret) {
    return textEncoder.encode(secret);
  }

  if (!fallbackSecret) {
    if (!globalThis.crypto || typeof globalThis.crypto.getRandomValues !== "function") {
      throw new Error("Crypto support is required to generate an AUTH_SECRET fallback");
    }

    fallbackSecret = new Uint8Array(32);
    globalThis.crypto.getRandomValues(fallbackSecret);

    if (process.env.NODE_ENV === "development") {
      console.warn(
        "AUTH_SECRET is not set. Using an ephemeral secret for development only.",
      );
    }
  }

  return fallbackSecret;
}

async function getCryptoKey() {
  if (!globalThis.crypto?.subtle) {
    throw new Error("The Web Crypto API is not available in this environment");
  }

  if (!cachedCryptoKey) {
    cachedCryptoKey = globalThis.crypto.subtle.importKey(
      "raw",
      getSecretKeyBytes(),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
  }

  return cachedCryptoKey;
}

function base64UrlEncode(data: ArrayBuffer | Uint8Array) {
  const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
  let base64: string;

  if (typeof Buffer !== "undefined") {
    base64 = Buffer.from(bytes).toString("base64");
  } else {
    let binary = "";
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    base64 = btoa(binary);
  }

  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/u, "");
}

function base64UrlDecode(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");

  if (typeof Buffer !== "undefined") {
    return new Uint8Array(Buffer.from(padded, "base64"));
  }

  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function constantTimeEqual(a: string, b: string) {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i += 1) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

async function signBody(body: string) {
  const key = await getCryptoKey();
  const signature = await globalThis.crypto.subtle.sign(
    "HMAC",
    key,
    textEncoder.encode(body),
  );
  return base64UrlEncode(signature);
}

export type SessionPayload = {
  userId: string;
  expiresAt: number;
};

async function encodePayload(payload: SessionPayload) {
  const body = base64UrlEncode(textEncoder.encode(JSON.stringify(payload)));
  const signature = await signBody(body);
  return `${body}.${signature}`;
}

async function decodePayload(token: string): Promise<SessionPayload | null> {
  const [body, providedSignature] = token.split(".");
  if (!body || !providedSignature) {
    return null;
  }

  const expectedSignature = await signBody(body);
  if (!constantTimeEqual(providedSignature, expectedSignature)) {
    return null;
  }

  try {
    const decoded = base64UrlDecode(body);
    const parsed = JSON.parse(textDecoder.decode(decoded));

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      typeof parsed.userId !== "string" ||
      typeof parsed.expiresAt !== "number"
    ) {
      return null;
    }

    return parsed as SessionPayload;
  } catch (error) {
    console.error("Failed to parse session token", error);
    return null;
  }
}

export async function encrypt(payload: SessionPayload) {
  return encodePayload(payload);
}

export async function decrypt(token: string): Promise<SessionPayload | null> {
  return decodePayload(token);
}

export async function createSession(userId: string) {
  const expires = Date.now() + SESSION_DURATION_MS;
  const session = await encrypt({ userId, expiresAt: expires });

  cookies().set(SESSION_COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expires),
  });
}

export function deleteSession() {
  cookies().delete(SESSION_COOKIE_NAME);
}

export async function getSession() {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) return null;

  const payload = await decrypt(sessionCookie);
  if (!payload) {
    cookies().delete(SESSION_COOKIE_NAME);
    return null;
  }

  if (Date.now() > payload.expiresAt) {
    cookies().delete(SESSION_COOKIE_NAME);
    return null;
  }

  return payload;
}
