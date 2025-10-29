import Link from "next/link";
import { logoutAction } from "@/lib/auth-actions";
import { getCurrentUser } from "@/lib/current-user";

export default async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/60 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold text-slate-100">
          Devirox Portfolio
        </Link>
        <nav className="flex items-center gap-4 text-sm text-slate-300">
          <Link className="hover:text-primary-300" href="/#projects">
            Projects
          </Link>
          <Link className="hover:text-primary-300" href="/#testimonials">
            Testimonials
          </Link>
          <Link className="hover:text-primary-300" href="/#contact">
            Contact
          </Link>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-slate-400 sm:inline">{user.name}</span>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-primary-400 hover:text-primary-200"
                >
                  Sign out
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-primary-400 hover:text-primary-200"
                href="/login"
              >
                Sign in
              </Link>
              <Link
                className="rounded-lg bg-primary-500 px-3 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-primary-400"
                href="/register"
              >
                Join now
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
