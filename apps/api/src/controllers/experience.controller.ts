import type { Request, Response } from "express";
import {
  getAllExperience,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../services/experience.service";
import { createExperienceSchema } from "@portfolio/schemas";
import logger from "../config/logger";
import { sendSuccess, sendError } from "../utils/response";

export const listExperience = async (_req: Request, res: Response) => {
  try {
    sendSuccess(res, await getAllExperience(), "Experience fetched successfully");
  } catch (error) {
    logger.error("Failed to list experience", { error });
    sendError(res, "Failed to fetch experience", 502);
  }
};

export const getExperience = async (req: Request, res: Response) => {
  try {
    const experience = await getExperienceById(req.params.id as string);
    if (!experience) return sendError(res, "Experience not found", 404);
    sendSuccess(res, experience, "Experience fetched successfully");
  } catch (error) {
    logger.error("Failed to get experience", { error });
    sendError(res, "Failed to fetch experience", 502);
  }
};

export const createExperienceHandler = async (req: Request, res: Response) => {
  const parsed = createExperienceSchema.safeParse(req.body);
  if (!parsed.success) {
    return sendError(res, "Invalid experience data", 400);
  }
  try {
    const experience = await createExperience(parsed.data);
    sendSuccess(res, experience, "Experience created successfully", 201);
  } catch (error) {
    logger.error("Failed to create experience", { error });
    sendError(res, "Failed to create experience", 502);
  }
};

export const updateExperienceHandler = async (req: Request, res: Response) => {
  const parsed = createExperienceSchema.safeParse(req.body);
  if (!parsed.success) {
    return sendError(res, "Invalid experience data", 400);
  }
  try {
    const experience = await updateExperience(req.params.id as string, parsed.data);
    sendSuccess(res, experience, "Experience updated successfully");
  } catch (error) {
    logger.error("Failed to update experience", { error });
    sendError(res, "Failed to update experience", 502);
  }
};

export const deleteExperienceHandler = async (req: Request, res: Response) => {
  try {
    await deleteExperience(req.params.id as string);
    sendSuccess(res, null, "Experience deleted successfully");
  } catch (error) {
    logger.error("Failed to delete experience", { error });
    sendError(res, "Failed to delete experience", 502);
  }
};
