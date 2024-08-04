import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.js', // Entry point of your library
  output: [
    {
      file: 'dist/my-library.esm.js',
      format: 'esm', // ES module format
      sourcemap: true,
    },
  ],
  plugins: [
    resolve({
		preferBuiltins: true
	}), // Resolve node_modules
    commonjs(), // Convert CommonJS to ESM
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**', // Only transpile our source code
    }),
  ],
};
