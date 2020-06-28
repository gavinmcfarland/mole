import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default [
	{
		input: 'src/index.js',
		output: {
			file: 'dist/index.js',
			format: 'cjs',
			sourcemap: true
		},
		plugins: [
			commonjs(),
			terser()
		]
	}
];
