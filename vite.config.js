// vite.config.js
import { defineConfig } from 'vite';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js', // Replace with your entry file
      formats: ['ems'], // Use 'cjs' for CommonJS format
    },
    rollupOptions: {
      external: [], // Add external modules if needed
      output: {
        dir: 'dist', // Output directory for the bundled files
        entryFileNames: '[name].js', // Entry file name pattern
      },
      plugins: [
        nodeResolve(), // Resolve Node.js modules
        commonjs(), // Convert CommonJS modules to ES6
      ],
    },
  },
});
