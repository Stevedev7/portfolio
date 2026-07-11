import { Router } from "express";
import {
  listExperience,
  getExperience,
  createExperienceHandler,
  updateExperienceHandler,
  deleteExperienceHandler,
} from "../controllers/experience.controller";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

/**
 * @openapi
 * /experience:
 *   get:
 *     summary: Get all work experience
 *     tags: [Experience]
 *     responses:
 *       200:
 *         description: List of experience entries
 *   post:
 *     summary: Create a new experience entry
 *     tags: [Experience]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Experience created
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.get("/", listExperience);
router.post("/", requireAuth, createExperienceHandler);

/**
 * @openapi
 * /experience/{id}:
 *   get:
 *     summary: Get an experience entry by ID
 *     tags: [Experience]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Experience found
 *       404:
 *         description: Experience not found
 *   put:
 *     summary: Update an experience entry
 *     tags: [Experience]
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
 *         description: Experience updated
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete an experience entry
 *     tags: [Experience]
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
 *         description: Experience deleted
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", getExperience);
router.put("/:id", requireAuth, updateExperienceHandler);
router.delete("/:id", requireAuth, deleteExperienceHandler);

export default router;
