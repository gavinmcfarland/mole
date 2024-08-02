import DynamicImport from '@rtvision/esbuild-dynamic-import';

import esbuild from 'esbuild';

esbuild.build({
	entryPoints: ['src/index.js'], // Specify your entry points
	// outfile: "dist/index.js",
	// bundle: true, // Enable bundling
	// format: 'esm', // Output format as ES module
	// splitting: true, // Enable code splitting
	outdir: 'dist', // Output directory
	// chunkNames: 'chunks/[name]-[hash]', // Optional: Customize chunk names
	minify: true, // Optional: Minify the output
	// sourcemap: true, // Optional: Generate source maps
	// external: ['fsevents'],
	// platform: 'node'
}).catch(() => process.exit(1));

// entryPoints: ['src/index.js'], // Specify your entry points
// 	bundle: true, // Enable bundling
// 	format: 'esm', // Output format as ES module
// 	splitting: true, // Enable code splitting
// 	outdir: 'dist', // Output directory
// 	// chunkNames: 'chunks/[name]-[hash]', // Optional: Customize chunk names
// 	// minify: true, // Optional: Minify the output
// 	// sourcemap: true, // Optional: Generate source maps
// 	external: ['fsevents'],
// 	platform: 'node'

// 		// plugins: [DynamicImport({ transformExtensions: ['.vue'], changeRelativeToAbsolute: true, filter: /src\/.*\.js$/ }),],
// 		entryPoints: ['src/index.js'],
// 		bundle: true,
// 		outdir: 'dist/'
// 	  //   outfile: 'dist/index.js',
// 	  //   platform: 'node',
// 		format: 'esm',
// 	  //   target: ['esnext'],
// 		splitting: true,
// 	  //   external: ['fsevents'], // Exclude fsevents from the bundle
