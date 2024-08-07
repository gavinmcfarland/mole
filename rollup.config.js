import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
	// ESM Build
	{
		input: 'src/index.js', // Adjust this to your entry file
		output: {
			dir: 'dist/esm', // Directory for ESM output
			format: 'es', // ESM format
			sourcemap: true, // Optional: include source maps
		},
		plugins: [
			resolve(),
			commonjs(),
		],
		onwarn(warning, warn) {
			// suppress eval warnings
			if (warning.code === 'EVAL') return
			if (warning.code === 'CIRCULAR_DEPENDENCY') return
			console.log("wa ------", warning.code)
			warn(warning)
		}
	},
	// CJS Build
	{
		input: 'src/index.js', // Adjust this to your entry file
		output: {
			dir: 'dist/cjs', // Directory for CJS output
			format: 'cjs', // CommonJS format
			sourcemap: true, // Optional: include source maps
		},
		plugins: [
			resolve(),
			commonjs(),
		],
		onwarn(warning, warn) {
			// suppress eval warnings
			if (warning.code === 'EVAL') return
			if (warning.code === 'CIRCULAR_DEPENDENCY') return
			console.log("wa ------", warning.code)
			warn(warning)
		}
	},
];
