import esbuild from 'esbuild';

// Can only get esbuild to work when bundling and using the shim below

// Having to apply a shim because when bundling as esm get the following error `Error: Dynamic require of "fs" is not supported`
// https://github.com/evanw/esbuild/pull/2067#issuecomment-1073039746

const ESM_REQUIRE_SHIM = `
await (async () => {
  const { dirname } = await import("path");
  const { fileURLToPath } = await import("url");

  /**
   * Shim entry-point related paths.
   */
  if (typeof globalThis.__filename === "undefined") {
    globalThis.__filename = fileURLToPath(import.meta.url);
  }
  if (typeof globalThis.__dirname === "undefined") {
    globalThis.__dirname = dirname(globalThis.__filename);
  }
  /**
   * Shim require if needed.
   */
  if (typeof globalThis.require === "undefined") {
    const { default: module } = await import("module");
    globalThis.require = module.createRequire(import.meta.url);
  }
})();
`;

/** Tell esbuild to add the shim to emitted JS. */
const shimBanner = {
	"js": ESM_REQUIRE_SHIM
};

/** Whether or not you're bundling. */
const bundle = true;


(async () => {
	/**
 * ESNext + ESM, bundle: true, and require() shim in banner.
 */
	await esbuild.build({
		entryPoints: ['src/index.js'], // Specify your entry points
		outfile: "dist/index.js",
		bundle, // Enable bundling
		format: 'esm', // Output format as ES module
		// outdir: 'dist', // Output directory
		// minify: true, // Optional: Minify the output
		// sourcemap: true, // Optional: Generate source maps
		external: ['fsevents'],
		banner: bundle ? shimBanner : undefined,
		platform: 'node',
	}).catch(() => process.exit(1));

	await esbuild.build({
		entryPoints: ['src/index.js'], // Specify your entry points
		outfile: "dist/index.cjs",
		bundle, // Enable bundling
		format: 'cjs', // Output format as ES module
		// outdir: 'dist', // Output directory
		// minify: true, // Optional: Minify the output
		// sourcemap: true, // Optional: Generate source maps
		external: ['fsevents'],
		platform: 'node',
		target: ['es2016'],
	}).catch(() => process.exit(1));
})()

