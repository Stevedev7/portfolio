import { Router } from "express";
import {
  listCertifications,
  getCertification,
  createCertificationHandler,
  updateCertificationHandler,
  deleteCertificationHandler,
} from "../controllers/certifications.controller";
import { requireAuth } from "../middleware/requireAuth";

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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Certification created
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.get("/", listCertifications);
router.post("/", requireAuth, createCertificationHandler);

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
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Certification updated
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete a certification
 *     tags: [Certifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Certification deleted
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", getCertification);
router.put("/:id", requireAuth, updateCertificationHandler);
router.delete("/:id", requireAuth, deleteCertificationHandler);

export default router;
