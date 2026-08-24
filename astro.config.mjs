// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  adapter: vercel(),

  image: {
    service: { entrypoint: "astro/assets/services/noop" },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
});
