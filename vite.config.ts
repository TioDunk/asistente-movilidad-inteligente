import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://bewhiskered-myrtle-gamily.ngrok-free.dev",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/v1": {
        target: "https://gatherable-monserrate-stereochemically.ngrok-free.dev",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/v1/, ""),
      },
    },
    allowedHosts: ["rossie-unattested-resistantly.ngrok-free.dev"],
  },
});
