import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ["@portfolio/schemas"],
  },
  server: {
    proxy: {
      "/storage": {
        target: "http://localhost:9000/portfolio-files",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/storage/, ""),
      },
    },
  },
});
