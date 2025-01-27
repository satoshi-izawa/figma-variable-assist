import { defineConfig, UserConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';

type Input = NonNullable<NonNullable<NonNullable<UserConfig['build']>['rollupOptions']>['input']>;

const input: Input = process.env.TYPE === 'ui' ? {
  ui: './src/ui/index.tsx',
} : {
  logic: './src/logic/index.ts',
}

export default defineConfig({
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    react({
      plugins: [['@swc/plugin-emotion', {
        'autoLabel': 'always',
        'labelFormat': '[filename]__[local]'
      }]]
    }),
  ],
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
  resolve: {
    alias: [{
      find: /^@emotion\/css$/,
      replacement: path.resolve(__dirname, 'src/lib/myEmotion.ts'),
    }],
  },
});
