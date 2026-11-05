import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const usdRate = require("./usd-rate.cjs");
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "usd-rate",
      configureServer(server) {
        server.middlewares.use(usdRate);
      },
    },
  ],
});
