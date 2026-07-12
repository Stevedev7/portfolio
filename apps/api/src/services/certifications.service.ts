import { env } from "../config/env";
import { certificationSchema, type Certification, type CreateCertificationInput } from "@portfolio/schemas";
import { z } from "zod";

export const getAllCertifications = async (): Promise<Certification[]> => {
  const response = await fetch(`${env.JSON_SERVER_URL}/certifications`);
  if (!response.ok) throw new Error(`Failed to fetch certifications: ${response.status}`);
  return z.array(certificationSchema).parse(await response.json());
};

export const getCertificationById = async (id: string): Promise<Certification | null> => {
  const response = await fetch(`${env.JSON_SERVER_URL}/certifications/${id}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Failed to fetch certification: ${response.status}`);
  return certificationSchema.parse(await response.json());
};

export const createCertification = async (input: CreateCertificationInput): Promise<Certification> => {
  const response = await fetch(`${env.JSON_SERVER_URL}/certifications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(`Failed to create certification: ${response.status}`);
  return certificationSchema.parse(await response.json());
};

export const updateCertification = async (id: string, input: CreateCertificationInput): Promise<Certification> => {
  const response = await fetch(`${env.JSON_SERVER_URL}/certifications/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error(`Failed to update certification: ${response.status}`);
  return certificationSchema.parse(await response.json());
};

export const deleteCertification = async (id: string): Promise<void> => {
  const response = await fetch(`${env.JSON_SERVER_URL}/certifications/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error(`Failed to delete certification: ${response.status}`);
};
