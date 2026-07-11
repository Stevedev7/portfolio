import express from "express";
import projectsRoutes from "./routes/projects.routes";
import aboutRoutes from "./routes/about.routes";
import skillsRoutes from "./routes/skills.routes";
import experienceRoutes from "./routes/experience.routes";
import educationRoutes from "./routes/education.routes";
import certificationsRoutes from "./routes/certifications.routes";
import configRoutes from "./routes/config.routes";

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/projects", projectsRoutes);
app.use("/about", aboutRoutes);
app.use("/skills", skillsRoutes);
app.use("/experience", experienceRoutes);
app.use("/education", educationRoutes);
app.use("/certifications", certificationsRoutes);
app.use("/config", configRoutes);

export default app;
