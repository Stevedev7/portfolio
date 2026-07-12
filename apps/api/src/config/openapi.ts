import { createDocument } from "zod-openapi";
import { z } from "zod";
import {
  skillSchema, createSkillSchema,
  experienceSchema, createExperienceSchema,
  educationSchema, createEducationSchema,
  projectSchema, createProjectSchema,
  certificationSchema, createCertificationSchema,
  aboutSchema,
  configSchema,
  loginSchema,
  errorResponseSchema,
} from "@portfolio/schemas";

const idParam = z.object({ id: z.string() });

const successResponse = (dataSchema: z.ZodTypeAny) =>
  z.object({
    success: z.literal(true),
    data: dataSchema,
    message: z.string(),
  });

const entity = (
  name: string,
  path: string,
  fullSchema: z.ZodTypeAny,
  createSchema: z.ZodTypeAny
) => ({
  [`/${path}`]: {
    get: {
      tags: [name],
      summary: `Get all ${name.toLowerCase()}`,
      responses: {
        200: { description: "Success", content: { "application/json": { schema: successResponse(z.array(fullSchema)) } } },
      },
    },
    post: {
      tags: [name],
      summary: `Create a new ${name.toLowerCase()} entry`,
      security: [{ bearerAuth: [] }],
      requestBody: { content: { "application/json": { schema: createSchema } } },
      responses: {
        201: { description: "Created", content: { "application/json": { schema: successResponse(fullSchema) } } },
        400: { description: "Invalid input", content: { "application/json": { schema: errorResponseSchema } } },
        401: { description: "Unauthorized", content: { "application/json": { schema: errorResponseSchema } } },
      },
    },
  },
  [`/${path}/{id}`]: {
    get: {
      tags: [name],
      summary: `Get a ${name.toLowerCase()} entry by ID`,
      requestParams: { path: idParam },
      responses: {
        200: { description: "Success", content: { "application/json": { schema: successResponse(fullSchema) } } },
        404: { description: "Not found", content: { "application/json": { schema: errorResponseSchema } } },
      },
    },
    put: {
      tags: [name],
      summary: `Update a ${name.toLowerCase()} entry`,
      security: [{ bearerAuth: [] }],
      requestParams: { path: idParam },
      requestBody: { content: { "application/json": { schema: createSchema } } },
      responses: {
        200: { description: "Updated", content: { "application/json": { schema: successResponse(fullSchema) } } },
        401: { description: "Unauthorized", content: { "application/json": { schema: errorResponseSchema } } },
      },
    },
    delete: {
      tags: [name],
      summary: `Delete a ${name.toLowerCase()} entry`,
      security: [{ bearerAuth: [] }],
      requestParams: { path: idParam },
      responses: {
        200: { description: "Deleted", content: { "application/json": { schema: successResponse(z.null()) } } },
        401: { description: "Unauthorized", content: { "application/json": { schema: errorResponseSchema } } },
        409: { description: "Conflict — still referenced elsewhere", content: { "application/json": { schema: errorResponseSchema } } },
      },
    },
  },
});

const singleRecord = (name: string, path: string, fullSchema: z.ZodTypeAny) => ({
  [`/${path}`]: {
    get: {
      tags: [name],
      summary: `Get ${name.toLowerCase()}`,
      responses: {
        200: { description: "Success", content: { "application/json": { schema: successResponse(fullSchema) } } },
      },
    },
    put: {
      tags: [name],
      summary: `Update ${name.toLowerCase()}`,
      security: [{ bearerAuth: [] }],
      requestBody: { content: { "application/json": { schema: fullSchema } } },
      responses: {
        200: { description: "Updated", content: { "application/json": { schema: successResponse(fullSchema) } } },
        400: { description: "Invalid input", content: { "application/json": { schema: errorResponseSchema } } },
        401: { description: "Unauthorized", content: { "application/json": { schema: errorResponseSchema } } },
      },
    },
  },
});

export const openApiDocument = createDocument({
  openapi: "3.1.0",
  info: {
    title: "Portfolio Platform API",
    version: "1.0.0",
    description: "API for managing portfolio content",
  },
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
    },
  },
  paths: {
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Admin login",
        requestBody: { content: { "application/json": { schema: loginSchema } } },
        responses: {
          200: { description: "Login successful", content: { "application/json": { schema: successResponse(z.object({ token: z.string() })) } } },
          401: { description: "Invalid credentials", content: { "application/json": { schema: errorResponseSchema } } },
        },
      },
    },
    ...singleRecord("About", "about", aboutSchema),
    ...entity("Skills", "skills", skillSchema, createSkillSchema),
    ...entity("Experience", "experience", experienceSchema, createExperienceSchema),
    ...entity("Education", "education", educationSchema, createEducationSchema),
    ...entity("Projects", "projects", projectSchema, createProjectSchema),
    ...entity("Certifications", "certifications", certificationSchema, createCertificationSchema),
    ...singleRecord("Config", "config", configSchema),
  },
});
