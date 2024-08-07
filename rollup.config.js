import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import renameToCjs from './lib/rename-to-cjs.js';

const commonPlugins = [
	resolve(),
	commonjs(),
];

const handleWarnings = (warning, warn) => {
	if (warning.code === 'EVAL') return;
	if (warning.code === 'CIRCULAR_DEPENDENCY') return;
	warn(warning);
};

export default [
	{
		input: 'src/index.js',
		output: {
			dir: 'dist/esm',
			format: 'es',
			sourcemap: true,
		},
		plugins: [
			...commonPlugins,
		],
		onwarn: handleWarnings,
	},
	{
		input: 'src/index.js',
		output: {
			dir: 'dist/cjs',
			format: 'cjs',
			sourcemap: true,
		},
		plugins: [
			...commonPlugins,
			renameToCjs(),
		],
		onwarn: handleWarnings,
	},
];
