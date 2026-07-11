import { env } from "../config/env";
import { aboutSchema, type About } from "@portfolio/schemas";

export  const getAbout = async (): Promise<About> => {
  const response = await fetch(`${env.JSON_SERVER_URL}/about`);

  if (!response.ok) {
    throw new Error(`Failed to fetch about: ${response.status}`);
  }

  const data = await response.json();
  return aboutSchema.parse(data);
}

export  const updateAbout = async (input: About): Promise<About> => {
  const response = await fetch(`${env.JSON_SERVER_URL}/about`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(`Failed to update about: ${response.status}`);
  }

  const data = await response.json();
  return aboutSchema.parse(data);
}
