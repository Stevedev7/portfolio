import { Router } from "express";
import { getConfigHandler, updateConfigHandler } from "../controllers/config.controller";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

/**
 * @openapi
 * /config:
 *   get:
 *     summary: Get site section visibility config
 *     tags: [Config]
 *     responses:
 *       200:
 *         description: Config record
 *   put:
 *     summary: Update site section visibility config
 *     tags: [Config]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Config updated
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.get("/", getConfigHandler);
router.put("/", requireAuth, updateConfigHandler);

export default router;
