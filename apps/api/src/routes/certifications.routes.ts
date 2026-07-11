import { Router } from "express";
import {
  listCertifications,
  getCertification,
  createCertificationHandler,
  updateCertificationHandler,
  deleteCertificationHandler,
} from "../controllers/certifications.controller";

const router = Router();

router.get("/", listCertifications);
router.get("/:id", getCertification);
router.post("/", createCertificationHandler);
router.put("/:id", updateCertificationHandler);
router.delete("/:id", deleteCertificationHandler);

export default router;
