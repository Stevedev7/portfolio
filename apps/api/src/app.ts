import express from "express";
import projectsRoutes from "./routes/projects.routes";
import aboutRoutes from "./routes/about.routes";
import skillsRoutes from "./routes/skills.routes";
import experienceRoutes from "./routes/experience.routes";
import educationRoutes from "./routes/education.routes";
import certificationsRoutes from "./routes/certifications.routes";
import configRoutes from "./routes/config.routes";
import { errorHandler } from "./middleware/errorHandler";
import { sendError } from "./utils/response";
import { healthCheckHandler } from "./controllers/health.controller";
import cors from "cors";
import { env } from "./config/env";
import helmet from "helmet";

const app = express();

const allowedOrigins = env.ALLOWED_ORIGINS.split(",");

app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(express.json());
app.use(helmet());
app.use(express.json({ limit: "10kb" }));

app.get("/health", healthCheckHandler);
app.use("/projects", projectsRoutes);
app.use("/about", aboutRoutes);
app.use("/skills", skillsRoutes);
app.use("/experience", experienceRoutes);
app.use("/education", educationRoutes);
app.use("/certifications", certificationsRoutes);
app.use("/config", configRoutes);

app.use((_req, res) => {
  sendError(res, "Route not found", 404);
});

app.use(errorHandler);

export default app;
