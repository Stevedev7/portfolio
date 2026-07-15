import type { Request, Response } from "express";
import { uploadFile, listFiles, deleteFile } from "../services/files.service";
import logger from "../config/logger";
import { sendSuccess, sendError } from "../utils/response";

export const uploadFileHandler = async (req: Request, res: Response) => {
	if (!req.file) {
		return sendError(res, "No file provided", 400);
	}

	try {
		const key = `${Date.now()}-${req.file.originalname}`;
		const meta = await uploadFile(key, req.file.buffer, req.file.mimetype);
		sendSuccess(res, meta, "File uploaded successfully", 201);
	} catch (error) {
		logger.error("Failed to upload file", { error });
		sendError(res, "Failed to upload file", 502);
	}
};

export const listFilesHandler = async (_req: Request, res: Response) => {
	try {
		const files = await listFiles();
		sendSuccess(res, files, "Files fetched successfully");
	} catch (error) {
		logger.error("Failed to list files", { error });
		sendError(res, "Failed to fetch files", 502);
	}
};

export const deleteFileHandler = async (req: Request, res: Response) => {
	try {
		await deleteFile(req.params.key as string);
		sendSuccess(res, null, "File deleted successfully");
	} catch (error) {
		logger.error("Failed to delete file", { error });
		sendError(res, "Failed to delete file", 502);
	}
};
