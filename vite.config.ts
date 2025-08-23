import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
import { fileURLToPath } from "url";
import { VitePWA } from "vite-plugin-pwa";
import { PATH_NAME } from "./src/configs/pathName";

// Check if building for Electron
const isElectron = process.env.BUILD_TARGET === "electron";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const navigateFallbackAllowlist = Object.values(PATH_NAME).map((route) => {
  if (route === "/") return /^\/$/;
  return new RegExp(`^${route.replace(/\//g, "\\/")}`);
});

// Simple plugin to handle Electron-specific configurations
const electronPlugin = () => {
  return {
    name: "electron-plugin",
    config(config: any) {
      if (isElectron) {
        // Keep the config simple for Electron builds
        // config.define = {
        //   ...config.define,
        // };
      }
      return config;
    },
    transformIndexHtml(html: string) {
      if (isElectron) {
        const envScript = `
          <script>
            window.__ENV__ = ${JSON.stringify({
              BUILD_TARGET: "electron",
              API_URL: process.env.VITE_API_URL || process.env.API_URL,
              VITE_API_URL: process.env.VITE_API_URL,
            })};
            globalThis.__ENV__ = window.__ENV__;
          </script>
        `;
        return html.replace("</head>", `${envScript}</head>`);
      }
      return html;
    },
  };
};

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  define: {},
  plugins: [
    electronPlugin(),
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        // This will transform your SVG to a React component
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
    // Only include PWA plugin for web builds, not Electron
    ...(isElectron
      ? []
      : [
          VitePWA({
            registerType: "autoUpdate",
            filename: "sw.js",
            devOptions: {
              enabled: true, // enables SW in dev for testing
            },
            workbox: {
              cleanupOutdatedCaches: true,
              navigateFallback: "/index.html",
              navigateFallbackAllowlist,
            },
            manifest: {
              name: "HR Admin",
              short_name: "Admin",
              start_url: "/",
              display: "standalone",
              background_color: "#ffffff",
              theme_color: "#ffffff",
              icons: [
                {
                  src: "/images/logo/logo-icon.svg",
                  sizes: "192x192",
                  type: "image/svg",
                },
                {
                  src: "/images/logo/logo-icon.svg",
                  sizes: "512x512",
                  type: "image/svg",
                },
              ],
            },
          }),
        ]),
  ],
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
      "@/services": path.resolve(__dirname, "./src/services"),
      "@/types": path.resolve(__dirname, "./src/types"),
      "@/shared": path.resolve(__dirname, "./src/shared"),
      "@/store": path.resolve(__dirname, "./src/store"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/context": path.resolve(__dirname, "./src/context"),
      "@/configs": path.resolve(__dirname, "./src/configs"),
      "@/guards": path.resolve(__dirname, "./src/guards"),
      "@/layout": path.resolve(__dirname, "./src/layout"),
      "@/routes": path.resolve(__dirname, "./src/routes"),
      "@/i18n": path.resolve(__dirname, "./src/i18n"),
      "@/icons": path.resolve(__dirname, "./src/icons"),
    },
  },
});
