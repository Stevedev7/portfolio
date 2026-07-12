import { Router } from "express";
import {
  listEducation,
  getEducation,
  createEducationHandler,
  updateEducationHandler,
  deleteEducationHandler,
} from "../controllers/education.controller";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

/**
 * @openapi
 * /education:
 *   get:
 *     summary: Get all education entries
 *     tags: [Education]
 *     responses:
 *       200:
 *         description: List of education entries
 *   post:
 *     summary: Create a new education entry
 *     tags: [Education]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Education created
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.get("/", listEducation);
router.post("/", requireAuth, createEducationHandler);

/**
 * @openapi
 * /education/{id}:
 *   get:
 *     summary: Get an education entry by ID
 *     tags: [Education]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Education found
 *       404:
 *         description: Education not found
 *   put:
 *     summary: Update an education entry
 *     tags: [Education]
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
 *         description: Education updated
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete an education entry
 *     tags: [Education]
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
 *         description: Education deleted
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", getEducation);
router.put("/:id", requireAuth, updateEducationHandler);
router.delete("/:id", requireAuth, deleteEducationHandler);

export default router;
