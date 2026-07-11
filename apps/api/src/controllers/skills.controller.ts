import type { Request, Response } from "express";
import {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
  findSkillReferences,
} from "../services/skills.service";
import { createSkillSchema } from "../schemas/skill.schema";
import logger from "../config/logger";
import { sendSuccess, sendError } from "../utils/response";

export const listSkills = async (_req: Request, res: Response) => {
  try {
    sendSuccess(res, await getAllSkills(), "Skills fetched successfully");
  } catch (error) {
    logger.error("Failed to list skills", { error });
    sendError(res, "Failed to fetch skills", 502);
  }
};

export const getSkill = async (req: Request, res: Response) => {
  try {
    const skill = await getSkillById(req.params.id as string);
    if (!skill) return sendError(res, "Skill not found", 404);
    sendSuccess(res, skill, "Skill fetched successfully");
  } catch (error) {
    logger.error("Failed to get skill", { error });
    sendError(res, "Failed to fetch skill", 502);
  }
};

export const createSkillHandler = async (req: Request, res: Response) => {
  const parsed = createSkillSchema.safeParse(req.body);
  if (!parsed.success) {
    return sendError(res, "Invalid skill data", 400);
  }
  try {
    const skill = await createSkill(parsed.data);
    sendSuccess(res, skill, "Skill created successfully", 201);
  } catch (error) {
    logger.error("Failed to create skill", { error });
    sendError(res, "Failed to create skill", 502);
  }
};

export const updateSkillHandler = async (req: Request, res: Response) => {
  const parsed = createSkillSchema.safeParse(req.body);
  if (!parsed.success) {
    return sendError(res, "Invalid skill data", 400);
  }
  try {
    const skill = await updateSkill(req.params.id as string, parsed.data);
    sendSuccess(res, skill, "Skill updated successfully");
  } catch (error) {
    logger.error("Failed to update skill", { error });
    sendError(res, "Failed to update skill", 502);
  }
};

export const deleteSkillHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const references = await findSkillReferences(id);

    if (references.length > 0) {
      return sendError(res, `Cannot delete skill: still referenced in ${references.join(", ")}`, 409);
    }

    await deleteSkill(id);
    sendSuccess(res, null, "Skill deleted successfully");
  } catch (error) {
    logger.error("Failed to delete skill", { error });
    sendError(res, "Failed to delete skill", 502);
  }
};
