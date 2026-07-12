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
}).meta({ id: "Experience"});

export const createExperienceSchema = experienceSchema.omit({ id: true }).meta({ id: "CreateExperienceInput"});

export type Experience = z.infer<typeof experienceSchema>;
export type CreateExperienceInput = z.infer<typeof createExperienceSchema>;
