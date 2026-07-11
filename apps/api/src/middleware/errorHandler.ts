import type { Request, Response, NextFunction } from "express";
import logger from "../config/logger";
import { sendError } from "../utils/response";

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error("Unhandled error", { error: err.message, stack: err.stack });
  sendError(res, "Internal server error", 500);
};
