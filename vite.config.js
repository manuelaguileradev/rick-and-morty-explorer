import { defineConfig } from "vite";

// GitHub Pages serves the site from /<repo-name>/, not from the domain root.
// If you rename the repository, update this value to match.
export default defineConfig({
  base: "/rick-and-morty-explorer/",
  build: { outDir: "docs" },
});
