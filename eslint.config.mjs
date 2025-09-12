/* eslint-disable no-underscore-dangle */
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import path from 'path';
import { fileURLToPath } from 'url';
import nextPlugin from '@next/eslint-plugin-next';

// Replicate __dirname functionality in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize FlatCompat for legacy config translation
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Global ignores
  {
    ignores: ['node_modules/', '.next/', 'dist/', 'build/'],
  },

  // Base configuration for all JavaScript/TypeScript files
  js.configs.recommended,

  // Use FlatCompat to extend legacy configurations
  // The order is important: later configs override earlier ones.
  ...compat.extends(
    'airbnb',
    'airbnb-typescript',
    'next/core-web-vitals',
    'airbnb/hooks',
    'prettier' // Must be last to disable conflicting style rules
  ),

  // Specific configuration for TypeScript files
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjs,ts,tsx,mts}'],
    plugins: {
      '@next/next': nextPlugin,
    },
    languageOptions: {
      parserOptions: {
        // Enables type-aware linting rules
        project: true,
      },
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      'react/react-in-jsx-scope': 'off', // Not needed in Next.js 11+
      'react/prop-types': 'off', // Not needed when using TypeScript
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/lines-between-class-members': 'off',
      '@typescript-eslint/no-throw-literal': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/no-implied-eval': 'off',
      '@typescript-eslint/return-await': 'off',
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
      'import/no-extraneous-dependencies': ["error", {
        "devDependencies": true,
        "optionalDependencies": false,
        "peerDependencies": false}
      ],
      'import/prefer-default-export': 'off',
      'import/extensions': 'off',
      'react/jsx-props-no-spreading': 'off',
      'no-param-reassign': 'off',
      'react/require-default-props': 'off'
    },
  },
];

export default eslintConfig;