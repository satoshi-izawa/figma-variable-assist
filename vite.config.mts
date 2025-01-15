import type { UserConfig } from 'vite';

export default {
  root: '.',
  build: {
    outDir: './dist',
    rollupOptions: {
      input: {
        ui: './src/ui/index.ts',
        logic: './src/logic/index.ts',
      },
      output: {
        entryFileNames: '[name]/index.js',
      },
    },
  },
} satisfies UserConfig;
