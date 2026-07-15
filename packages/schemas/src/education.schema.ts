import { z } from "zod";

export const educationSchema = z.object({
  id: z.number(),
  institution: z.string().min(1),
  degree: z.string().min(1),
  modules: z.array(z.string()),
  startDate: z.string(),
  endDate: z.string().nullable(),
});

export const createEducationSchema = educationSchema.omit({ id: true });

export type Education = z.infer<typeof educationSchema>;
export type CreateEducationInput = z.infer<typeof createEducationSchema>;
