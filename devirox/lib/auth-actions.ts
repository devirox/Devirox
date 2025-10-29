"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "./prisma";
import { compare, hash } from "bcryptjs";
import { createSession, deleteSession } from "./auth";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type AuthFormState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "success"; message: string };

export async function registerAction(_: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const submission = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!submission.success) {
    const message = submission.error.errors[0]?.message ?? "Invalid form submission";
    return { status: "error", message };
  }

  const existingUser = await prisma.user.findUnique({ where: { email: submission.data.email } });
  if (existingUser) {
    return { status: "error", message: "An account with that email already exists" };
  }

  const passwordHash = await hash(submission.data.password, 10);
  const user = await prisma.user.create({
    data: {
      email: submission.data.email,
      name: submission.data.name,
      passwordHash,
    },
  });

  await createSession(user.id);
  return redirect("/dashboard");
}

export async function loginAction(_: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const submission = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!submission.success) {
    const message = submission.error.errors[0]?.message ?? "Invalid form submission";
    return { status: "error", message };
  }

  const user = await prisma.user.findUnique({ where: { email: submission.data.email } });
  if (!user) {
    return { status: "error", message: "Invalid email or password" };
  }

  const validPassword = await compare(submission.data.password, user.passwordHash);
  if (!validPassword) {
    return { status: "error", message: "Invalid email or password" };
  }

  await createSession(user.id);

  const redirectTo = formData.get("redirectTo");
  if (typeof redirectTo === "string" && redirectTo.startsWith("/") && !redirectTo.startsWith("//")) {
    return redirect(redirectTo);
  }

  return redirect("/dashboard");
}

export async function logoutAction() {
  deleteSession();
  return redirect("/");
}
