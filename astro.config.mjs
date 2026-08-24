// @ts-check
import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  adapter: node({ mode: "standalone" }),

  image: {
    service: { entrypoint: "astro/assets/services/noop" },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
});
