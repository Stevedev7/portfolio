import { z } from "zod";

export const aboutSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  bio: z.string().min(1),
  email: z.string().email(),
  location: z.string().min(1),
  avatarUrl: z.string().url().optional(),
  socialLinks: z.object({
    github: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    twitter: z.string().url().optional(),
  }),
}).meta({ id: "About"});

export type About = z.infer<typeof aboutSchema>;
