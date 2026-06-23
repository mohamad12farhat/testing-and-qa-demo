// Coverage config + the 80% quality gate. Failing a threshold makes
// `npm run coverage` exit non-zero, which turns CI red.

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.js"],
      exclude: ["src/server.js", "solution/**"], // server boots a port; solution isn't measured
      thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 },
    },
  },
});
