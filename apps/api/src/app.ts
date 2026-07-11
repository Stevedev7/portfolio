import express from "express";
import projectsRoutes from "./routes/projects.routes";

const app = express();

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/projects", projectsRoutes);

export default app;
