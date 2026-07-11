import { env } from "../config/env";
import { projectSchema, type Project, type CreateProjectInput } from "../schemas/project.schema";
import { z } from "zod";

export const getAllProjects = async (): Promise<Project[]> => {
  const response = await fetch(`${env.JSON_SERVER_URL}/projects`);
  if (!response.ok) throw new Error(`Failed to fetch projects: ${response.status}`);
  return z.array(projectSchema).parse(await response.json());
};

export const getProjectById = async (id: string): Promise<Project | null> => {
  const response = await fetch(`${env.JSON_SERVER_URL}/projects/${id}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Failed to fetch project: ${response.status}`);
  return projectSchema.parse(await response.json());
};

export const createProject = async (input: CreateProjectInput): Promise<Project> => {
  const response = await fetch(`${env.JSON_SERVER_URL}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(`Failed to create project: ${response.status}`);
  return projectSchema.parse(await response.json());
};

export const updateProject = async (id: string, input: CreateProjectInput): Promise<Project> => {
  const response = await fetch(`${env.JSON_SERVER_URL}/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(`Failed to update project: ${response.status}`);
  return projectSchema.parse(await response.json());
};

export const deleteProject = async (id: string): Promise<void> => {
  const response = await fetch(`${env.JSON_SERVER_URL}/projects/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error(`Failed to delete project: ${response.status}`);
};
