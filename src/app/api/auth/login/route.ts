import { NextResponse } from "next/server";
import { z } from "zod";

import loginUser from "@/modules/auth/login.service";
import { loginSchema } from "@/modules/auth/auth.validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedData = loginSchema.parse(body);

    const user = await loginUser(validatedData);

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        data: {
          user,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid JSON body",
        },
        { status: 400 },
      );
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: z.flattenError(error).fieldErrors,
        },
        { status: 400 },
      );
    }

    if (
      error instanceof Error &&
      error.message === "Invalid email or password"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 },
      );
    }

    console.error("Login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
