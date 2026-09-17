import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-20">
      <section className="mx-auto w-full max-w-3xl text-center">
        <div className="space-y-6">
          <div className="inline-flex items-center rounded-full border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
            Simple & Secure Authentication
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Welcome to AuthApp
          </h1>

          <p className="mx-auto max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            A simple authentication application built with Next.js, PostgreSQL,
            Prisma, and secure password hashing.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/register">Create an account</Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link href="/login">Sign in</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
