import express from "express";
import projectsRoutes from "./routes/projects.routes";
import aboutRoutes from "./routes/about.routes";

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/projects", projectsRoutes);
app.use("/about", aboutRoutes);

export default app;
