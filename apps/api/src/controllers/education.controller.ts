import type { Request, Response } from "express";
import {
  getAllEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../services/education.service";
import { createEducationSchema } from "@portfolio/schemas";
import logger from "../config/logger";
import { sendSuccess, sendError } from "../utils/response";

export const listEducation = async (_req: Request, res: Response) => {
  try {
    sendSuccess(res, await getAllEducation(), "Education fetched successfully");
  } catch (error) {
    logger.error("Failed to list education", { error });
    sendError(res, "Failed to fetch education", 502);
  }
};

export const getEducation = async (req: Request, res: Response) => {
  try {
    const education = await getEducationById(req.params.id as string);
    if (!education) return sendError(res, "Education not found", 404);
    sendSuccess(res, education, "Education fetched successfully");
  } catch (error) {
    logger.error("Failed to get education", { error });
    sendError(res, "Failed to fetch education", 502);
  }
};

export const createEducationHandler = async (req: Request, res: Response) => {
  const parsed = createEducationSchema.safeParse(req.body);
  if (!parsed.success) {
    return sendError(res, "Invalid education data", 400);
  }
  try {
    const education = await createEducation(parsed.data);
    sendSuccess(res, education, "Education created successfully", 201);
  } catch (error) {
    logger.error("Failed to create education", { error });
    sendError(res, "Failed to create education", 502);
  }
};

export const updateEducationHandler = async (req: Request, res: Response) => {
  const parsed = createEducationSchema.safeParse(req.body);
  if (!parsed.success) {
    return sendError(res, "Invalid education data", 400);
  }
  try {
    const education = await updateEducation(req.params.id as string, parsed.data);
    sendSuccess(res, education, "Education updated successfully");
  } catch (error) {
    logger.error("Failed to update education", { error });
    sendError(res, "Failed to update education", 502);
  }
};

export const deleteEducationHandler = async (req: Request, res: Response) => {
  try {
    await deleteEducation(req.params.id as string);
    sendSuccess(res, null, "Education deleted successfully");
  } catch (error) {
    logger.error("Failed to delete education", { error });
    sendError(res, "Failed to delete education", 502);
  }
};
