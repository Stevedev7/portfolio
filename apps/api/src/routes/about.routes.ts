import { Router } from "express";
import { getAboutHandler, updateAboutHandler } from "../controllers/about.controller";

const router = Router();

router.get("/", getAboutHandler);
router.put("/", updateAboutHandler);

export default router;
