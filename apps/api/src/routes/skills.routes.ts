import { Router } from "express";
import {
  listSkills,
  getSkill,
  createSkillHandler,
  updateSkillHandler,
  deleteSkillHandler,
} from "../controllers/skills.controller";

const router = Router();

router.get("/", listSkills);
router.get("/:id", getSkill);
router.post("/", createSkillHandler);
router.put("/:id", updateSkillHandler);
router.delete("/:id", deleteSkillHandler);

export default router;
