import { z } from "zod";

export const experienceSchema = z.object({
  id: z.number(),
  company: z.string().min(1),
  role: z.string().min(1),
  startDate: z.string(),
  endDate: z.string().nullable(),
  description: z.array(z.string()),
  location: z.string().min(1),
  skillIds: z.array(z.number()),
});

export const createExperienceSchema = experienceSchema.omit({ id: true });

export type Experience = z.infer<typeof experienceSchema>;
export type CreateExperienceInput = z.infer<typeof createExperienceSchema>;
