import { Router } from "express";
import {
  listEducation,
  getEducation,
  createEducationHandler,
  updateEducationHandler,
  deleteEducationHandler,
} from "../controllers/education.controller";

const router = Router();

router.get("/", listEducation);
router.get("/:id", getEducation);
router.post("/", createEducationHandler);
router.put("/:id", updateEducationHandler);
router.delete("/:id", deleteEducationHandler);

export default router;
