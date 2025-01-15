/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import figmaPlugin from '@figma/eslint-plugin-figma-plugins';
import { fixupPluginRules } from "@eslint/compat";
// @ts-ignore
import prettier from "eslint-config-prettier";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  prettier,
  {
    files: ["**/*.*ts"],
    ignores: ["/node_modules"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'figma': fixupPluginRules(figmaPlugin as any)
    }
  }, {
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_",
        "destructuredArrayIgnorePattern": "^_",
      }
    ]
  }
}
);
