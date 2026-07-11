import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import type { LoginInput } from "../schemas/auth.schema";

export const verifyCredentials = async (input: LoginInput): Promise<boolean> => {
  if (input.username !== env.ADMIN_USERNAME) return false;
  return bcrypt.compare(input.password, env.ADMIN_PASSWORD_HASH);
};

export const generateToken = (username: string): string => {
  return jwt.sign({ username }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN } as jwt.SignOptions);
};
