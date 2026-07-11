import type { Response } from "express";

export const sendSuccess = (res: Response, data: unknown, message = "Success", statusCode = 200) => {
  res.status(statusCode).json({ success: true, data, message });
};

export const sendError = (res: Response, message = "Something went wrong", statusCode = 500) => {
  res.status(statusCode).json({ success: false, data: null, message });
};
