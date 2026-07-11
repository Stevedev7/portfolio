import type { Request, Response } from "express";
import { getAllProjects } from "../services/projects.service";
import logger from "../config/logger";

export const  listProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await getAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    logger.error("Failed to list projects", { error });
    res.status(502).json({ message: "Failed to fetch projects" });
  }
}
