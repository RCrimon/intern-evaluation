"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerFormSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type RegisterFormData = z.infer<typeof registerFormSchema>;
type FieldName = keyof RegisterFormData;

export default function RegisterForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    setServerError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
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
        setServerError(result.error || result.message || "Registration failed");
        return;
      }

      
      router.push("/login?registered=true");
    } catch {
      setServerError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
      {serverError && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {serverError}
        </div>
      )}

      
      <form
        onSubmit={(e) => {
          e.preventDefault(); 
          handleSubmit(onSubmit)(e);
        }}
        method="POST"
        className="space-y-4 sm:space-y-5"
      >
       
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            {...register("name")}
            className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition duration-200 focus:border-[#FF6347] focus:ring-2 focus:ring-[#FF6347]/20"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        
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

   
        <div>
          <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-slate-700">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            {...register("confirmPassword")}
            className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition duration-200 focus:border-[#FF6347] focus:ring-2 focus:ring-[#FF6347]/20"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-[#FF6347] py-2.5 text-sm font-semibold text-white transition hover:bg-[#E55338] disabled:opacity-50"
        >
          {isSubmitting ? "Creating account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}