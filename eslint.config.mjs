import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json"
      }
    },
    rules: {
      "indent": ["error", 2], // Indentação de 2 espaços
      "quotes": ["error", "double"], // Usa aspas duplas
      "semi": ["error", "always"], // Sempre usa ponto e vírgula
      "no-console": "warn", // Alertas para console.log
      "eqeqeq": ["error", "always"], // Exige === ao invés de ==
      "@typescript-eslint/no-unused-vars": ["error"], // Proíbe variáveis não usadas
      "@typescript-eslint/no-explicit-any": "warn" // Evita uso excessivo de `any`
    }
  },
  tseslint.configs.recommended
]);
