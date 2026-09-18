import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center bg-white px-4 py-20">
      <section className="mx-auto w-full max-w-3xl text-center">
        <div className="space-y-6">
          <div className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-semibold text-[#FF6347]">
            Simple & Secure Authentication
          </div>

          <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-6-xl">
            Welcome to <span className="text-[#FF6347]">AuthApp</span>
          </h1>

          <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
            A secure authentication system built with Next.js, MongoDB Atlas, Mongoose, and password hashing.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-xl bg-[#FF6347] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#FF6347]/30 transition hover:bg-[#E55338]"
            >
              Create an account
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}