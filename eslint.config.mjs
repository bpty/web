import eslint from '@eslint/js'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import solid from 'eslint-plugin-solid/configs/typescript'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
import importPlugin from 'eslint-plugin-import'

export default defineConfig(
  {
    ignores: ['dist'],
  },
  eslint.configs.recommended,
  tseslint.configs.strict,
  importPlugin.flatConfigs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    extends: [importPlugin.flatConfigs.typescript],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    rules: {
      eqeqeq: ['error', 'smart'],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', ['parent', 'sibling'], 'index', 'object', 'type'],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'parent',
            },
          ],
          sortTypesGroup: true,
          'newlines-between': 'never',
        },
      ],
      'import/no-unresolved': 'off',
    },
  },
  solid,
  eslintPluginPrettier,
  {
    rules: {
      'prettier/prettier': ['error'],
    },
  },
  {
    files: ['src/**'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    ignores: ['src/**'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
)
