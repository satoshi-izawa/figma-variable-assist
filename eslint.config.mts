/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/ban-ts-comment */

//@ts-ignore
import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
// @ts-ignore
import prettier from "eslint-config-prettier";
import react from 'eslint-plugin-react';
// @ts-ignore
import reactHooks from 'eslint-plugin-react-hooks';

const compat = new FlatCompat();

export default tseslint.config([
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  react.configs.flat.recommended,
  prettier,
  ...compat.extends(
    'plugin:@figma/figma-plugins/recommended',
    'plugin:react-hooks/recommended',
  ),
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
      'react-hooks': reactHooks,
    },
    settings: {
      react: {
        version: 'detect',
      }
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
]);
