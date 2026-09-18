import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-2xl font-black tracking-tight text-[#FF6347]">
          AuthApp
        </Link>

        <nav className="flex items-center gap-3">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            Home
          </Link>

          <Link
            href="/login"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-[#FF6347] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#FF6347]/20 transition hover:bg-[#E55338]"
          >
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}