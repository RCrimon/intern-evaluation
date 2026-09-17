import bcrypt from "bcryptjs";

import { db } from "@/prisma/db";
import { LoginInput } from "./auth.validation";

const loginUser = async (payload: LoginInput) => {
  const email = payload.email;

  const user = await db.orm.public.User.first({
    email,
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatched = await bcrypt.compare(payload.password, user.password);

  if (!passwordMatched) {
    throw new Error("Invalid email or password");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export default loginUser;
