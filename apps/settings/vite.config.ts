import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig(({ mode }) => {
  const isRemote = mode === "remote";

  return {
    plugins: [react()],
    base: "/settings/",
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
    build: isRemote
      ? {
          lib: {
            entry: resolve(__dirname, "src/remote-entry.tsx"),
            name: "settingsRemote",
            formats: ["iife"],
            fileName: () => "settings-remote.js",
          },
        }
      : undefined,
  };
});
