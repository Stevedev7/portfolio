import { z, url } from "zod";

export const certificationSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  issuingOrganization: z.string().min(1),
  issueDate: z.string(),
  expiryDate: z.string().nullable(),
  credentialUrl: url().optional(),
  skillIds: z.array(z.number()),
}).meta({ id: "Certification" });

export const createCertificationSchema = certificationSchema.omit({ id: true }).meta({ id: "CreateCertificationInput" });

export type Certification = z.infer<typeof certificationSchema>;
export type CreateCertificationInput = z.infer<typeof createCertificationSchema>;
