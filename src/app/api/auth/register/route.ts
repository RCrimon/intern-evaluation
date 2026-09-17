import { NextResponse } from "next/server";
import { registerSchema } from "@/modules/auth/auth.validation";
import { authService } from "@/modules/auth/auth.service";
import z from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedData = registerSchema.parse(body);

    const user = await authService.registerUser(validatedData);

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful",
        data: user,
      },
      { status: 201 },
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
      error.message === "User already exists with this email"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 409 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
