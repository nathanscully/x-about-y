import { defineConfig, globalIgnores } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import eslintPluginAstro from 'eslint-plugin-astro';
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([globalIgnores([
    "**/dist/",
    "**/.output/",
    "**/node_modules/",
    "**/.astro/",
    "**/.cloudflare/",
    "**/.vercel/",
    "**/.netlify/",
    "**/pnpm-lock.yaml",
]), {
    extends: compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:jsx-a11y/recommended",
        "prettier",
    ),

    plugins: {
        "@typescript-eslint": typescriptEslint,
        "jsx-a11y": jsxA11Y,
    },

    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            project: "./tsconfig.json",
        },
    },

    rules: {
        "no-unused-vars": "off",

        "@typescript-eslint/no-unused-vars": ["error", {
            argsIgnorePattern: "^_",
            destructuredArrayIgnorePattern: "^_",
        }],

        "@typescript-eslint/no-explicit-any": "warn",
    },
}, {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {},
},
...eslintPluginAstro.configs.recommended]);