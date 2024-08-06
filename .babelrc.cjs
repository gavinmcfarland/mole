const presets = ["@babel/preset-env"];
const plugins = [];

const sourceMaps = true

// Rewire doesn't seem to be working with add-module-exports, so we use it just for testing
if (process.env.NODE_ENV === 'test') {
	plugins.push(["rewire"]);
}

module.exports = { presets, plugins, sourceMaps };
