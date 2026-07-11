import { Router } from "express";
import { getAboutHandler, updateAboutHandler } from "../controllers/about.controller";

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
 *     responses:
 *       200:
 *         description: About updated
 *       400:
 *         description: Invalid input
 */
router.get("/", getAboutHandler);
router.put("/", updateAboutHandler);

export default router;
