import { defineConfig, UserConfig } from 'vite';

type Input = NonNullable<NonNullable<NonNullable<UserConfig['build']>['rollupOptions']>['input']>;

const input: Input = process.env.TYPE === 'ui' ? {
  ui: './src/ui/index.tsx',
} : {
  logic: './src/logic/index.ts',
}

export default defineConfig({
  root: '.',
  build: {
    outDir: './dist',
    emptyOutDir: false,
    rollupOptions: {
      input,
      output: {
        entryFileNames: '[name]/index.js',
        inlineDynamicImports: true,
      },
    },
  },
});
