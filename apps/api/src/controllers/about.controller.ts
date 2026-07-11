import type { Request, Response } from "express";
import { getAbout, updateAbout } from "../services/about.service";
import { aboutSchema } from "../schemas/about.schema";
import logger from "../config/logger";
import { sendSuccess, sendError } from "../utils/response";

export const getAboutHandler = async (_req: Request, res: Response) => {
  try {
    const about = await getAbout();
    sendSuccess(res, about, "About fetched successfully");
  } catch (error) {
    logger.error("Failed to get about", { error });
    sendError(res, "Failed to fetch about", 502);
  }
};

export const updateAboutHandler = async (req: Request, res: Response) => {
  const parsed = aboutSchema.safeParse(req.body);

  if (!parsed.success) {
    return sendError(res, "Invalid about data", 400);
  }

  try {
    const updated = await updateAbout(parsed.data);
    sendSuccess(res, updated, "About updated successfully");
  } catch (error) {
    logger.error("Failed to update about", { error });
    sendError(res, "Failed to update about", 502);
  }
};
