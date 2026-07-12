import { env } from "../config/env";
import { configSchema, type Config } from "@portfolio/schemas";

export const getConfig = async (): Promise<Config> => {
  const response = await fetch(`${env.JSON_SERVER_URL}/config`);
  if (!response.ok) throw new Error(`Failed to fetch config: ${response.status}`);
  return configSchema.parse(await response.json());
};

export const updateConfig = async (input: Config): Promise<Config> => {
  const response = await fetch(`${env.JSON_SERVER_URL}/config`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(`Failed to update config: ${response.status}`);
  return configSchema.parse(await response.json());
};
