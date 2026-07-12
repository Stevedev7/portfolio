import { z } from "zod";

export const projectSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  description: z.array(z.string()),
  imageUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  repoUrl: z.string().url().optional(),
  featured: z.boolean(),
  skillIds: z.array(z.number()),
}).meta({ id: "Project"});

export const createProjectSchema = projectSchema.omit({ id: true }).meta({ id: "CreateProjectInput" });

export type Project = z.infer<typeof projectSchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
