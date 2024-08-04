import { defineConfig } from 'tsup'

// Can't get tsup to work
// Following still produces error: Dynamic require of "fs" is not supported
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
`

/** Tell esbuild to add the shim to emitted JS. */
const shimBanner = {
	js: ESM_REQUIRE_SHIM,
}

/** Whether or not you're bundling. */
const bundle = true

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['esm'], // Build for commonJS and ESmodules
	dts: true, // Generate declaration file (.d.ts)
	splitting: false,
	// sourcemap: true,
	clean: true,
	// node: 'node_modules/fs-extra',
	// shims: true,
	esbuildOptions(options) {
		// Modify esbuild options here
		options.external = ['fsevents']
		options.banner = bundle ? shimBanner : undefined
		options.platform = 'node'
	},
})
