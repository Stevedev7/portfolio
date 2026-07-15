import { z } from "zod";

export const fileMetaSchema = z.object({
	key: z.string(),
	size: z.number(),
	lastModified: z.string(),
	url: z.string().url(),
});

export type FileMeta = z.infer<typeof fileMetaSchema>;
