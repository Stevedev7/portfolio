import { z } from "zod";

export const skillSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  category: z.string().min(1),
  proficiency: z.string().optional(),
});

export const createSkillSchema = skillSchema.omit({ id: true });

export type Skill = z.infer<typeof skillSchema>;
export type CreateSkillInput = z.infer<typeof createSkillSchema>;
