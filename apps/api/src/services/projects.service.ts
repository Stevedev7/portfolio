import { env } from "../config/env";

export const getAllProjects = async () => {
  const response = await fetch(`${env.JSON_SERVER_URL}/projects`);

  if (!response.ok) {
    throw new Error(`Failed to fetch projects: ${response.status}`);
  }

  return response.json();
}
