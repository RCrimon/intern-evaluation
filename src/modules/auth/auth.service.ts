import { db } from "@/prisma/db";
import { RegisterInput } from "./auth.validation";
import bcrypt from "bcryptjs";

const registerUser = async (payload: RegisterInput) => {
  const email = payload.email;

  const existingUser = await db.orm.public.User.first({ email });

  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 12);

  const user = await db.orm.public.User.create({
    name: payload.name.trim(),
    email,
    password: hashedPassword,
  });

  console.log(user);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const authService = {
  registerUser,
};
