"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "./auth";
import {
  createUser,
  findUserByEmail,
  verifyPassword,
} from "./user-store";

function getString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function validateName(name: string) {
  if (name.length < 2) {
    return "Name must be at least 2 characters";
  }
  return null;
}

function validateEmail(email: string) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Enter a valid email address";
  }
  return null;
}

function validatePassword(password: string) {
  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }
  return null;
}

export type AuthFormState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "success"; message: string };

export async function registerAction(
  _: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const name = getString(formData.get("name"));
  const email = getString(formData.get("email")).toLowerCase();
  const password = getString(formData.get("password"));

  const nameError = validateName(name);
  if (nameError) {
    return { status: "error", message: nameError };
  }

  const emailError = validateEmail(email);
  if (emailError) {
    return { status: "error", message: emailError };
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    return { status: "error", message: passwordError };
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return { status: "error", message: "An account with that email already exists" };
  }

  const user = await createUser({ name, email, password });
  await createSession(user.id);
  return redirect("/dashboard");
}

export async function loginAction(
  _: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = getString(formData.get("email")).toLowerCase();
  const password = getString(formData.get("password"));

  if (!email || !password) {
    return { status: "error", message: "Email and password are required" };
  }

  const emailError = validateEmail(email);
  if (emailError) {
    return { status: "error", message: emailError };
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return { status: "error", message: "Invalid email or password" };
  }

  const validPassword = await verifyPassword(password, user);
  if (!validPassword) {
    return { status: "error", message: "Invalid email or password" };
  }

  await createSession(user.id);

  const redirectTo = formData.get("redirectTo");
  if (
    typeof redirectTo === "string" &&
    redirectTo.startsWith("/") &&
    !redirectTo.startsWith("//")
  ) {
    return redirect(redirectTo);
  }

  return redirect("/dashboard");
}

export async function logoutAction() {
  deleteSession();
  return redirect("/");
}
