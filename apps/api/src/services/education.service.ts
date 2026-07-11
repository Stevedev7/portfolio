import { env } from "../config/env";
import { educationSchema, type Education, type CreateEducationInput } from "@portfolio/schemas";
import { z } from "zod";

export const getAllEducation = async (): Promise<Education[]> => {
  const response = await fetch(`${env.JSON_SERVER_URL}/education`);
  if (!response.ok) throw new Error(`Failed to fetch education: ${response.status}`);
  return z.array(educationSchema).parse(await response.json());
};

export const getEducationById = async (id: string): Promise<Education | null> => {
  const response = await fetch(`${env.JSON_SERVER_URL}/education/${id}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Failed to fetch education: ${response.status}`);
  return educationSchema.parse(await response.json());
};

export const createEducation = async (input: CreateEducationInput): Promise<Education> => {
  const response = await fetch(`${env.JSON_SERVER_URL}/education`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(`Failed to create education: ${response.status}`);
  return educationSchema.parse(await response.json());
};

export const updateEducation = async (id: string, input: CreateEducationInput): Promise<Education> => {
  const response = await fetch(`${env.JSON_SERVER_URL}/education/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(`Failed to update education: ${response.status}`);
  return educationSchema.parse(await response.json());
};

export const deleteEducation = async (id: string): Promise<void> => {
  const response = await fetch(`${env.JSON_SERVER_URL}/education/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error(`Failed to delete education: ${response.status}`);
};
