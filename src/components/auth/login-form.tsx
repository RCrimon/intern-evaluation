"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginFormSchema>;
type FieldName = keyof LoginFormData;

type LoggedInUser = {
  id: string;
  name: string;
  email: string;
};

export default function LoginForm() {
  const [serverError, setServerError] = useState("");
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, messages]) => {
            const fieldName = field as FieldName;
            if (Array.isArray(messages) && messages[0]) {
              setError(fieldName, { type: "server", message: messages[0] });
            }
          });
        }
        setServerError(result.error || result.message || "Login failed");
        return;
      }

      setLoggedInUser(result.user || result.data?.user);
    } catch {
      setServerError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
        {serverError && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              {...register("email")}
              className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition duration-200 focus:border-[#FF6347] focus:ring-2 focus:ring-[#FF6347]/20"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition duration-200 focus:border-[#FF6347] focus:ring-2 focus:ring-[#FF6347]/20"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{ cursor: isSubmitting ? "not-allowed" : "pointer" }}
            className="w-full rounded-lg bg-[#FF6347] py-2.5 text-sm font-semibold text-white transition hover:bg-[#E55338] disabled:opacity-50"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>

      {loggedInUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-600">
              ✓
            </div>
            <h3 className="text-xl font-bold text-slate-800">
              Welcome back, {loggedInUser.name}!
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              You have successfully signed in to your account.
            </p>
            <button
              onClick={() => setLoggedInUser(null)}
              style={{ cursor: isSubmitting ? "not-allowed" : "pointer" }}
              className="mt-6 w-full relative z-10 rounded-lg bg-[#FF6347] py-2 text-sm font-semibold text-white transition hover:bg-[#E55338]"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
}