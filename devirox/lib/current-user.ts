import { getSession } from "./auth";
import { findUserById } from "./user-store";

export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;

  return findUserById(session.userId);
}
