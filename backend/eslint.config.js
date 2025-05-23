import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ['dist', ".cache", "node_modules"] },
  {
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
    ],
    files: ['src/**/*.ts', 'tests/**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [{
            name: 'tests',
            message: 'Do not import from tests in src',
          }],
          patterns: ['tests/*'],
        },
      ],
      "@typescript-eslint/explicit-function-return-type": ["error"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ],
      "require-await": "off",
      "@typescript-eslint/require-await": "error",
      '@typescript-eslint/no-floating-promises': 'error',
      "@typescript-eslint/no-misused-promises": "error",
      'no-console': 'warn'
    }
  }
);