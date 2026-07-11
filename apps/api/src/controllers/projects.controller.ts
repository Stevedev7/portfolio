import type { Request, Response } from "express";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../services/projects.service";
import { createProjectSchema } from "../schemas/project.schema";
import logger from "../config/logger";
import { sendSuccess, sendError } from "../utils/response";

export const listProjects = async (_req: Request, res: Response) => {
  try {
    sendSuccess(res, await getAllProjects(), "Projects fetched successfully");
  } catch (error) {
    logger.error("Failed to list projects", { error });
    sendError(res, "Failed to fetch projects", 502);
  }
};

export const getProject = async (req: Request, res: Response) => {
  try {
    const project = await getProjectById(req.params.id as string);
    if (!project) return sendError(res, "Project not found", 404);
    sendSuccess(res, project, "Project fetched successfully");
  } catch (error) {
    logger.error("Failed to get project", { error });
    sendError(res, "Failed to fetch project", 502);
  }
};

export const createProjectHandler = async (req: Request, res: Response) => {
  const parsed = createProjectSchema.safeParse(req.body);
  if (!parsed.success) {
    return sendError(res, "Invalid project data", 400);
  }
  try {
    const project = await createProject(parsed.data);
    sendSuccess(res, project, "Project created successfully", 201);
  } catch (error) {
    logger.error("Failed to create project", { error });
    sendError(res, "Failed to create project", 502);
  }
};

export const updateProjectHandler = async (req: Request, res: Response) => {
  const parsed = createProjectSchema.safeParse(req.body);
  if (!parsed.success) {
    return sendError(res, "Invalid project data", 400);
  }
  try {
    const project = await updateProject(req.params.id as string, parsed.data);
    sendSuccess(res, project, "Project updated successfully");
  } catch (error) {
    logger.error("Failed to update project", { error });
    sendError(res, "Failed to update project", 502);
  }
};

export const deleteProjectHandler = async (req: Request, res: Response) => {
  try {
    await deleteProject(req.params.id as string);
    sendSuccess(res, null, "Project deleted successfully");
  } catch (error) {
    logger.error("Failed to delete project", { error });
    sendError(res, "Failed to delete project", 502);
  }
};
