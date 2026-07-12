import { env } from "../config/env";
import { projectSchema } from "@portfolio/schemas";
import { skillSchema, type Skill, type CreateSkillInput } from "@portfolio/schemas";
import { experienceSchema } from "@portfolio/schemas";
import { certificationSchema } from "@portfolio/schemas";
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


export const findSkillReferences = async (id: string): Promise<string[]> => {
  const skillId = Number(id);

  const [projectsRes, experienceRes, certificationsRes] = await Promise.all([
    fetch(`${env.JSON_SERVER_URL}/projects`),
    fetch(`${env.JSON_SERVER_URL}/workExperience`),
    fetch(`${env.JSON_SERVER_URL}/certifications`),
  ]);

  const projects = z.array(projectSchema).parse(await projectsRes.json());
  const experience = z.array(experienceSchema).parse(await experienceRes.json());
  const certifications = z.array(certificationSchema).parse(await certificationsRes.json());

  const referencedIn: string[] = [];

  if (projects.some((p) => p.skillIds.includes(skillId))) {
    referencedIn.push("projects");
  }
  if (experience.some((e) => e.skillIds.includes(skillId))) {
    referencedIn.push("workExperience");
  }
  if (certifications.some((c) => c.skillIds.includes(skillId))) {
    referencedIn.push("certifications");
  }

  return referencedIn;
};

export const deleteSkill = async (id: string): Promise<void> => {
  const response = await fetch(`${env.JSON_SERVER_URL}/skills/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error(`Failed to delete skill: ${response.status}`);
};
