import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          signup: [
            "./src/views/signup/SignupLayout.vue",
            "./src/views/signup/SignupOrganizationView.vue",
            "./src/views/signup/SignupAmbassadorsView.vue"
          ]
        }
      }
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  server: {
    port: 3000
  },
  test: {
    globals: true,
    mockReset: true,
    restoreMocks: true,
    environment: "jsdom",
    setupFiles: ["tests/unit/support/globalMocks"]

  }
});
