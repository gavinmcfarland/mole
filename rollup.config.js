// import babel from '@rollup/plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
// import json from '@rollup/plugin-json';

export default [
	{
		input: 'src/index.js',
		output: {
			file: 'dist/index.js',
			format: 'cjs',
			sourcemap: true
		},
		plugins: [
			// commonjs(),
			// resolve()

			// json(),
			// babel({
			// 	babelHelpers: 'runtime',
			// 	skipPreflightCheck: true
			// }),
			// terser()
		]
	}
];
