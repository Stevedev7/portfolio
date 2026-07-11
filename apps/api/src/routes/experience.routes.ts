import { Router } from "express";
import {
  listExperience,
  getExperience,
  createExperienceHandler,
  updateExperienceHandler,
  deleteExperienceHandler,
} from "../controllers/experience.controller";

const router = Router();

router.get("/", listExperience);
router.get("/:id", getExperience);
router.post("/", createExperienceHandler);
router.put("/:id", updateExperienceHandler);
router.delete("/:id", deleteExperienceHandler);

export default router;
