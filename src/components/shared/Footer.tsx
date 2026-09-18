import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} <span className="font-semibold text-[#FF6347]">AuthApp</span>. All rights reserved.
        </p>

        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm text-slate-500 transition hover:text-[#FF6347]">
            Home
          </Link>
          <Link href="/login" className="text-sm text-slate-500 transition hover:text-[#FF6347]">
            Login
          </Link>
          <Link href="/register" className="text-sm text-slate-500 transition hover:text-[#FF6347]">
            Register
          </Link>
        </nav>
      </div>
    </footer>
  );
}