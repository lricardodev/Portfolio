import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      "react/no-unescaped-entities": "off", // Desactiva el error de comillas y apóstrofes
      "@typescript-eslint/no-explicit-any": "warn", // Convierte el error de 'any' en una advertencia
      "@typescript-eslint/no-unused-vars": "warn", // Convierte el error de variables no usadas en una advertencia
      "@typescript-eslint/ban-ts-comment": "off" // Desactiva el error de @ts-ignore
    },
  },
];

export default eslintConfig;
