import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { sendError } from "../utils/response";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return sendError(res, "Unauthorized", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, env.JWT_SECRET);
    next();
  } catch {
    sendError(res, "Invalid or expired token", 401);
  }
};
