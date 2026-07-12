import { z } from "zod";

export const educationSchema = z.object({
  id: z.number(),
  institution: z.string().min(1),
  degree: z.string().min(1),
  fieldOfStudy: z.string().min(1),
  startDate: z.string(),
  endDate: z.string().nullable(),
}).meta({ id: "Education"});

export const createEducationSchema = educationSchema.omit({ id: true }).meta({ id: "CreateEducationInput"});

export type Education = z.infer<typeof educationSchema>;
export type CreateEducationInput = z.infer<typeof createEducationSchema>;
