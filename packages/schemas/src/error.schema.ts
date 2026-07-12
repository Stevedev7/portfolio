import { z } from "zod";

export const errorResponseSchema = z.object({
  success: z.literal(false),
  data: z.null(),
  message: z.string(),
}).meta({ id: "ErrorResponse" });
