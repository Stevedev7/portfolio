import { Router } from "express";
import multer from "multer";
import { uploadFileHandler, listFilesHandler, deleteFileHandler } from "../controllers/files.controller";
import { requireAuth } from "../middleware/requireAuth";

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

const router = Router();

router.get("/", requireAuth, listFilesHandler);
router.post("/", requireAuth, upload.single("file"), uploadFileHandler);
router.delete("/:key", requireAuth, deleteFileHandler);

export default router;
