import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/current-user";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col gap-8 px-6 py-16">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold text-slate-100">Welcome back, {user.name}</h1>
        <p className="text-base text-slate-400">
          This secure area is where you can plan upcoming case studies, collect testimonials, and keep track of outreach
          conversations. The next step is to connect your content pipeline to this dashboard.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-slate-100">Account details</h2>
          <dl className="mt-4 space-y-2 text-sm text-slate-300">
            <div className="flex justify-between">
              <dt>Email</dt>
              <dd className="font-medium text-slate-100">{user.email}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Member since</dt>
              <dd>{new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(user.createdAt)}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-slate-100">Next steps</h2>
          <p className="mt-3 text-sm text-slate-300">
            Hook up this dashboard to your CMS or data layer so you can curate projects and testimonials directly from here.
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex w-fit items-center justify-center rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-primary-400"
          >
            Preview public portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
