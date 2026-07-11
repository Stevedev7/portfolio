import { env } from "../config/env";
import { skillSchema, type Skill, type CreateSkillInput } from "../schemas/skill.schema";
import { z } from "zod";

export const getAllSkills = async (): Promise<Skill[]> => {
  const response = await fetch(`${env.JSON_SERVER_URL}/skills`);
  if (!response.ok) throw new Error(`Failed to fetch skills: ${response.status}`);
  return z.array(skillSchema).parse(await response.json());
}

export const getSkillById = async (id: string): Promise<Skill | null> => {
  const response = await fetch(`${env.JSON_SERVER_URL}/skills/${id}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Failed to fetch skill: ${response.status}`);
  return skillSchema.parse(await response.json());
}

export const createSkill = async (input: CreateSkillInput): Promise<Skill> => {
  const response = await fetch(`${env.JSON_SERVER_URL}/skills`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(`Failed to create skill: ${response.status}`);
  return skillSchema.parse(await response.json());
}

export const updateSkill = async (id: string, input: CreateSkillInput): Promise<Skill> => {
  const response = await fetch(`${env.JSON_SERVER_URL}/skills/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(`Failed to update skill: ${response.status}`);
  return skillSchema.parse(await response.json());
}

export const deleteSkill = async (id: string): Promise<void> => {
  const response = await fetch(`${env.JSON_SERVER_URL}/skills/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error(`Failed to delete skill: ${response.status}`);
}
