import type { Request, Response } from "express";
import { getConfig, updateConfig } from "../services/config.service";
import { configSchema } from "@portfolio/schemas";
import logger from "../config/logger";
import { sendSuccess, sendError } from "../utils/response";

export const getConfigHandler = async (_req: Request, res: Response) => {
  try {
    const config = await getConfig();
    sendSuccess(res, config, "Config fetched successfully");
  } catch (error) {
    logger.error("Failed to get config", { error });
    sendError(res, "Failed to fetch config", 502);
  }
};

export const updateConfigHandler = async (req: Request, res: Response) => {
  const parsed = configSchema.safeParse(req.body);
  if (!parsed.success) {
    return sendError(res, "Invalid config data", 400);
  }
  try {
    const config = await updateConfig(parsed.data);
    sendSuccess(res, config, "Config updated successfully");
  } catch (error) {
    logger.error("Failed to update config", { error });
    sendError(res, "Failed to update config", 502);
  }
};
