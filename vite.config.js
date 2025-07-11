import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  build: {
    outDir: "dist",
  },
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0", // Allows access from other devices
    port: 5173, // Use your preferred port
  },
});
