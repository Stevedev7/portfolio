import { Router } from "express";
import { getConfigHandler, updateConfigHandler } from "../controllers/config.controller";

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
 *     responses:
 *       200:
 *         description: Config updated
 *       400:
 *         description: Invalid input
 */
router.get("/", getConfigHandler);
router.put("/", updateConfigHandler);

export default router;
