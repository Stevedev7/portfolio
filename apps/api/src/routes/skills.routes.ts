import { Router } from "express";
import {
  listSkills,
  getSkill,
  createSkillHandler,
  updateSkillHandler,
  deleteSkillHandler,
} from "../controllers/skills.controller";

const router = Router();

/**
 * @openapi
 * /skills:
 *   get:
 *     summary: Get all skills
 *     tags: [Skills]
 *     responses:
 *       200:
 *         description: List of skills
 *   post:
 *     summary: Create a new skill
 *     tags: [Skills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               proficiency:
 *                 type: string
 *     responses:
 *       201:
 *         description: Skill created
 *       400:
 *         description: Invalid input
 */
router.get("/", listSkills);
router.post("/", createSkillHandler);

/**
 * @openapi
 * /skills/{id}:
 *   get:
 *     summary: Get a skill by ID
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Skill found
 *       404:
 *         description: Skill not found
 *   put:
 *     summary: Update a skill
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Skill updated
 *   delete:
 *     summary: Delete a skill
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Skill deleted
 *       409:
 *         description: Skill still referenced elsewhere
 */
router.get("/:id", getSkill);
router.put("/:id", updateSkillHandler);
router.delete("/:id", deleteSkillHandler);

export default router;
