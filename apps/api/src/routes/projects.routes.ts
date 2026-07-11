import { Router } from "express";
import {
  listProjects,
  getProject,
  createProjectHandler,
  updateProjectHandler,
  deleteProjectHandler,
} from "../controllers/projects.controller";

const router = Router();

router.get("/", listProjects);
router.get("/:id", getProject);
router.post("/", createProjectHandler);
router.put("/:id", updateProjectHandler);
router.delete("/:id", deleteProjectHandler);

export default router;
