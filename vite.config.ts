import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3001,
    proxy: {
      "/ms/": {
        target: "http://127.0.0.1:8080/ms",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/ms/, "")
      }
    }
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  plugins: [ react(), splitVendorChunkPlugin() ]
});