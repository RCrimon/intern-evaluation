"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginFormSchema = z.object({
  email: z.email("Invalid email address"),

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
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setServerError("");

    const validationResult = loginFormSchema.safeParse(data);

    if (!validationResult.success) {
      validationResult.error.issues.forEach((issue) => {
        const field = issue.path[0] as FieldName;

        if (field) {
          setError(field, {
            type: "manual",
            message: issue.message,
          });
        }
      });

      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, messages]) => {
            const fieldName = field as FieldName;

            if (Array.isArray(messages) && messages[0]) {
              setError(fieldName, {
                type: "server",
                message: messages[0],
              });
            }
          });
        }

        if (result.message) {
          setServerError(result.message);
        }

        return;
      }

      // Login successful
      setLoggedInUser(result.data.user);
    } catch {
      setServerError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Card className="border-border/60 shadow-lg">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-xl">Sign in</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {serverError && (
              <Alert variant="destructive">
                <AlertDescription>{serverError}</AlertDescription>
              </Alert>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                placeholder="Your Email"
                {...register("email")}
                aria-invalid={!!errors.email}
              />

              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                aria-invalid={!!errors.password}
              />

              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Login Success Modal */}
      <Dialog
        open={!!loggedInUser}
        onOpenChange={(open) => {
          if (!open) {
            setLoggedInUser(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center sm:text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl">
              ✓
            </div>

            <DialogTitle className="text-2xl">
              Welcome back{loggedInUser ? `, ${loggedInUser.name}` : ""}!
            </DialogTitle>

            <DialogDescription className="pt-2 text-base">
              You have successfully signed in to your account. Everything is
              ready for you to continue.
            </DialogDescription>
          </DialogHeader>

          <div className="pt-4">
            <Button className="w-full" onClick={() => setLoggedInUser(null)}>
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
