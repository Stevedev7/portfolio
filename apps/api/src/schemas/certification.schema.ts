import { z } from "zod";

export const certificationSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  issuingOrganization: z.string().min(1),
  issueDate: z.string(),
  expiryDate: z.string().nullable(),
  credentialUrl: z.string().url().optional(),
  skillIds: z.array(z.number()),
});

export const createCertificationSchema = certificationSchema.omit({ id: true });

export type Certification = z.infer<typeof certificationSchema>;
export type CreateCertificationInput = z.infer<typeof createCertificationSchema>;
