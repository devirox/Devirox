"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { useSearchParams } from "next/navigation";
import { loginAction, type AuthFormState } from "@/lib/auth-actions";

const initialState: AuthFormState = { status: "idle" };

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? undefined;
  const [state, formAction] = useFormState(loginAction, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 px-4 py-16">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl backdrop-blur">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-slate-400">
            Sign in to access your personalized dashboard and manage your portfolio content.
          </p>
        </div>

        <form action={formAction} className="space-y-6">
          {redirectTo ? <input type="hidden" name="redirectTo" value={redirectTo} /> : null}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-base outline-none ring-primary-500 focus:border-primary-500 focus:ring-2"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-base outline-none ring-primary-500 focus:border-primary-500 focus:ring-2"
            />
          </div>

          {state.status === "error" ? (
            <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {state.message}
            </p>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-lg bg-primary-500 px-4 py-2 text-center text-sm font-semibold text-slate-950 transition hover:bg-primary-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-sm text-slate-400">
          Need an account?{" "}
          <Link className="font-medium text-primary-300 hover:text-primary-200" href="/register">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
