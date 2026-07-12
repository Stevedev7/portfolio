import { Router } from "express";
import { getAboutHandler, updateAboutHandler } from "../controllers/about.controller";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

/**
 * @openapi
 * /about:
 *   get:
 *     summary: Get about/bio information
 *     tags: [About]
 *     responses:
 *       200:
 *         description: About record
 *   put:
 *     summary: Update about/bio information
 *     tags: [About]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: About updated
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.get("/", getAboutHandler);
router.put("/", requireAuth, updateAboutHandler);

export default router;
