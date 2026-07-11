import type { Request, Response } from "express";
import { loginSchema } from "../schemas/auth.schema";
import { verifyCredentials, generateToken } from "../services/auth.service";
import logger from "../config/logger";
import { sendSuccess, sendError } from "../utils/response";

export const loginHandler = async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return sendError(res, "Invalid login data", 400);
  }

  try {
    const isValid = await verifyCredentials(parsed.data);
    if (!isValid) {
      return sendError(res, "Invalid credentials", 401);
    }

    const token = generateToken(parsed.data.username);
    sendSuccess(res, { token }, "Login successful");
  } catch (error) {
    logger.error("Login failed", { error });
    sendError(res, "Login failed", 500);
  }
};
