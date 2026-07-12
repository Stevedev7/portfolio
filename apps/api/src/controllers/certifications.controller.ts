import type { Request, Response } from "express";
import {
  getAllCertifications,
  getCertificationById,
  createCertification,
  updateCertification,
  deleteCertification,
} from "../services/certifications.service";
import { createCertificationSchema } from "@portfolio/schemas";
import logger from "../config/logger";
import { sendSuccess, sendError } from "../utils/response";

export const listCertifications = async (_req: Request, res: Response) => {
  try {
    sendSuccess(res, await getAllCertifications(), "Certifications fetched successfully");
  } catch (error) {
    logger.error("Failed to list certifications", { error });
    sendError(res, "Failed to fetch certifications", 502);
  }
};

export const getCertification = async (req: Request, res: Response) => {
  try {
    const certification = await getCertificationById(req.params.id as string);
    if (!certification) return sendError(res, "Certification not found", 404);
    sendSuccess(res, certification, "Certification fetched successfully");
  } catch (error) {
    logger.error("Failed to get certification", { error });
    sendError(res, "Failed to fetch certification", 502);
  }
};

export const createCertificationHandler = async (req: Request, res: Response) => {
  const parsed = createCertificationSchema.safeParse(req.body);
  if (!parsed.success) {
    return sendError(res, "Invalid certification data", 400);
  }
  try {
    const certification = await createCertification(parsed.data);
    sendSuccess(res, certification, "Certification created successfully", 201);
  } catch (error) {
    logger.error("Failed to create certification", { error });
    sendError(res, "Failed to create certification", 502);
  }
};

export const updateCertificationHandler = async (req: Request, res: Response) => {
  const parsed = createCertificationSchema.safeParse(req.body);
  if (!parsed.success) {
    return sendError(res, "Invalid certification data", 400);
  }
  try {
    const certification = await updateCertification(req.params.id as string, parsed.data);
    sendSuccess(res, certification, "Certification updated successfully");
  } catch (error) {
    logger.error("Failed to update certification", { error });
    sendError(res, "Failed to update certification", 502);
  }
};

export const deleteCertificationHandler = async (req: Request, res: Response) => {
  try {
    await deleteCertification(req.params.id as string);
    sendSuccess(res, null, "Certification deleted successfully");
  } catch (error) {
    logger.error("Failed to delete certification", { error });
    sendError(res, "Failed to delete certification", 502);
  }
};
