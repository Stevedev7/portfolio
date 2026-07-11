import type { Request, Response } from "express";
import { env } from "../config/env";
import { sendSuccess, sendError } from "../utils/response";

export const healthCheckHandler = async (_req: Request, res: Response) => {
  try {
    const response = await fetch(`${env.JSON_SERVER_URL}/config`);

    if (!response.ok) {
      return sendError(res, "JSON Server unreachable", 503);
    }

    sendSuccess(res, { api: "ok", jsonServer: "ok" }, "Healthy");
  } catch {
    sendError(res, "JSON Server unreachable", 503);
  }
};
