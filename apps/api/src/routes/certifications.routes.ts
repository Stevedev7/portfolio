import { Router } from "express";
import {
  listCertifications,
  getCertification,
  createCertificationHandler,
  updateCertificationHandler,
  deleteCertificationHandler,
} from "../controllers/certifications.controller";

const router = Router();

/**
 * @openapi
 * /certifications:
 *   get:
 *     summary: Get all certifications
 *     tags: [Certifications]
 *     responses:
 *       200:
 *         description: List of certifications
 *   post:
 *     summary: Create a new certification
 *     tags: [Certifications]
 *     responses:
 *       201:
 *         description: Certification created
 *       400:
 *         description: Invalid input
 */
router.get("/", listCertifications);
router.post("/", createCertificationHandler);

/**
 * @openapi
 * /certifications/{id}:
 *   get:
 *     summary: Get a certification by ID
 *     tags: [Certifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Certification found
 *       404:
 *         description: Certification not found
 *   put:
 *     summary: Update a certification
 *     tags: [Certifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Certification updated
 *   delete:
 *     summary: Delete a certification
 *     tags: [Certifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Certification deleted
 */
router.get("/:id", getCertification);
router.put("/:id", updateCertificationHandler);
router.delete("/:id", deleteCertificationHandler);

export default router;
