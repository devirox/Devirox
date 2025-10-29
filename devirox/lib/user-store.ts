import { promises as fs } from "node:fs";
import path from "node:path";
import { randomBytes, randomUUID, scrypt as nodeScrypt } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(nodeScrypt);
const USERS_FILE_PATH = path.join(process.cwd(), "data", "users.json");

export type UserRecord = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  salt: string;
  createdAt: string;
};

export type PublicUser = {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
};

async function ensureStore() {
  try {
    await fs.access(USERS_FILE_PATH);
  } catch (_error) {
    await fs.mkdir(path.dirname(USERS_FILE_PATH), { recursive: true });
    await fs.writeFile(USERS_FILE_PATH, "[]", "utf8");
  }
}

async function readUsers(): Promise<UserRecord[]> {
  await ensureStore();
  const raw = await fs.readFile(USERS_FILE_PATH, "utf8");

  try {
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) {
      return [];
    }

    return data.filter((item): item is UserRecord => {
      return (
        typeof item === "object" &&
        item !== null &&
        typeof item.id === "string" &&
        typeof item.email === "string" &&
        typeof item.name === "string" &&
        typeof item.passwordHash === "string" &&
        typeof item.salt === "string" &&
        typeof item.createdAt === "string"
      );
    });
  } catch (error) {
    console.error("Failed to parse users store, resetting file.", error);
    await fs.writeFile(USERS_FILE_PATH, "[]", "utf8");
    return [];
  }
}

async function writeUsers(users: UserRecord[]) {
  await fs.writeFile(USERS_FILE_PATH, JSON.stringify(users, null, 2), "utf8");
}

function toPublicUser(record: UserRecord): PublicUser {
  return {
    id: record.id,
    email: record.email,
    name: record.name,
    createdAt: new Date(record.createdAt),
  };
}

export async function findUserByEmail(email: string) {
  const users = await readUsers();
  return users.find((user) => user.email === email) ?? null;
}

export async function findUserById(userId: string): Promise<PublicUser | null> {
  const users = await readUsers();
  const record = users.find((user) => user.id === userId);
  return record ? toPublicUser(record) : null;
}

export async function verifyPassword(
  password: string,
  user: Pick<UserRecord, "passwordHash" | "salt">,
) {
  const derived = (await scrypt(password, user.salt, 64)) as Buffer;
  return derived.toString("hex") === user.passwordHash;
}

export async function createUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): Promise<PublicUser> {
  const users = await readUsers();
  const salt = randomBytes(16).toString("hex");
  const derived = (await scrypt(password, salt, 64)) as Buffer;

  const record: UserRecord = {
    id: randomUUID(),
    email,
    name,
    passwordHash: derived.toString("hex"),
    salt,
    createdAt: new Date().toISOString(),
  };

  users.push(record);
  await writeUsers(users);

  return toPublicUser(record);
}
