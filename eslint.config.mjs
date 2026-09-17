import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "src/prisma/contract.d.ts",
      "migrations/**",
    ],
  },
]);
