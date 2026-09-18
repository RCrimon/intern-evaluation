"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "User";

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-600 shadow-lg shadow-emerald-100">
          ✓
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Welcome, <span className="text-[#FF6347]">{name}</span>!
        </h1>

        <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm">
          <p className="text-base text-slate-600">
             <strong className="text-slate-800">Login Successful!</strong>
          </p>
          <p className="mt-2 text-sm text-slate-500">
            You have successfully signed in to your account. Welcome back to AuthApp dashboard!
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/"
            className="w-full rounded-xl bg-[#FF6347] py-3 text-sm font-semibold text-white shadow-md shadow-[#FF6347]/20 transition hover:bg-[#E55338]"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </main>
  );
}