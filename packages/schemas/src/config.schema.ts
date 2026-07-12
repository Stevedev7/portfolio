import { z } from "zod";

export const configSchema = z.object({
  id: z.number(),
  projects: z.boolean(),
  workExperience: z.boolean(),
  skills: z.boolean(),
  education: z.boolean(),
  certifications: z.boolean(),
  about: z.boolean(),
}).meta({ id: "Config"});

export type Config = z.infer<typeof configSchema>;
