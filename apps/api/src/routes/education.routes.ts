import { Router } from "express";
import {
  listEducation,
  getEducation,
  createEducationHandler,
  updateEducationHandler,
  deleteEducationHandler,
} from "../controllers/education.controller";

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
 *     responses:
 *       201:
 *         description: Education created
 *       400:
 *         description: Invalid input
 */
router.get("/", listEducation);
router.post("/", createEducationHandler);

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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Education updated
 *   delete:
 *     summary: Delete an education entry
 *     tags: [Education]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Education deleted
 */
router.get("/:id", getEducation);
router.put("/:id", updateEducationHandler);
router.delete("/:id", deleteEducationHandler);

export default router;
