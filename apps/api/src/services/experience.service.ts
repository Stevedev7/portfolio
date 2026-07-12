import { env } from "../config/env";
import { experienceSchema, type Experience, type CreateExperienceInput } from "@portfolio/schemas";
import { z } from "zod";

export const getAllExperience = async (): Promise<Experience[]> => {
  const response = await fetch(`${env.JSON_SERVER_URL}/workExperience`);
  if (!response.ok) throw new Error(`Failed to fetch experience: ${response.status}`);
  return z.array(experienceSchema).parse(await response.json());
};

export const getExperienceById = async (id: string): Promise<Experience | null> => {
  const response = await fetch(`${env.JSON_SERVER_URL}/workExperience/${id}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Failed to fetch experience: ${response.status}`);
  return experienceSchema.parse(await response.json());
};

export const createExperience = async (input: CreateExperienceInput): Promise<Experience> => {
  const response = await fetch(`${env.JSON_SERVER_URL}/workExperience`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(`Failed to create experience: ${response.status}`);
  return experienceSchema.parse(await response.json());
};

export const updateExperience = async (id: string, input: CreateExperienceInput): Promise<Experience> => {
  const response = await fetch(`${env.JSON_SERVER_URL}/workExperience/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(`Failed to update experience: ${response.status}`);
  return experienceSchema.parse(await response.json());
};

export const deleteExperience = async (id: string): Promise<void> => {
  const response = await fetch(`${env.JSON_SERVER_URL}/workExperience/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error(`Failed to delete experience: ${response.status}`);
};
