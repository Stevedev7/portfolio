import type { Request, Response } from "express";
import { getAbout, updateAbout } from "../services/about.service";
import { aboutSchema } from "../schemas/about.schema";
import logger from "../config/logger";

export async function getAboutHandler(_req: Request, res: Response) {
  try {
    const about = await getAbout();
    res.status(200).json(about);
  } catch (error) {
    logger.error("Failed to get about", { error });
    res.status(502).json({ message: "Failed to fetch about" });
  }
}

export async function updateAboutHandler(req: Request, res: Response) {
  const parsed = aboutSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid about data", errors: parsed.error.format() });
  }

  try {
    const updated = await updateAbout(parsed.data);
    res.status(200).json(updated);
  } catch (error) {
    logger.error("Failed to update about", { error });
    res.status(502).json({ message: "Failed to update about" });
  }
}
