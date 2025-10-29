import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const SESSION_COOKIE_NAME = "portfolio_session";
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days in seconds

let fallbackSecret: Uint8Array | null = null;

function getSecretKey() {
  const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;
  if (secret) {
    return new TextEncoder().encode(secret);
  }

  if (!fallbackSecret) {
    const array = new Uint8Array(32);
    if (!globalThis.crypto || typeof globalThis.crypto.getRandomValues !== "function") {
      throw new Error("Crypto support is required to generate an AUTH_SECRET fallback");
    }

    globalThis.crypto.getRandomValues(array);
    fallbackSecret = array;
    if (process.env.NODE_ENV === "development") {
      console.warn("AUTH_SECRET is not set. Using an ephemeral secret for development only.");
    }
  }

  return fallbackSecret;
}

export type SessionPayload = {
  userId: string;
  expiresAt: number;
};

export async function encrypt(payload: SessionPayload) {
  const secretKey = getSecretKey();
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(payload.expiresAt / 1000)
    .setIssuedAt()
    .sign(secretKey);
}

export async function decrypt(token: string): Promise<SessionPayload | null> {
  try {
    const secretKey = getSecretKey();
    const { payload } = await jwtVerify<SessionPayload>(token, secretKey);
    return payload;
  } catch (error) {
    console.error("Failed to verify session token", error);
    return null;
  }
}

export async function createSession(userId: string) {
  const expires = new Date(Date.now() + SESSION_DURATION * 1000);
  const session = await encrypt({ userId, expiresAt: expires.getTime() });

  cookies().set(SESSION_COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires,
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
