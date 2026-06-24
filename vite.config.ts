import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    ssr: 'src/server/index.ts',
    target: 'node22',
    outDir: 'dist/server',
    minify: true,
    sourcemap: true,
    emptyOutDir: true,
    reportCompressedSize: false,
    copyPublicDir: false,
    commonjsOptions: {
      ignoreDynamicRequires: true,
    },
    rollupOptions: {
      output: {
        format: 'cjs',
        entryFileNames: 'index.cjs',
        inlineDynamicImports: true,
      },
    },
  },
  ssr: {
    noExternal: true,
  },
});
