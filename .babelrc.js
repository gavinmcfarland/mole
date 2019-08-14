const presets = ["@babel/preset-env"];
const plugins = [
	["@babel/plugin-proposal-class-properties", { "loose": true }],
	["add-module-exports"],
];

if (process.env.NODE_ENV === 'test') {
	plugins.push(["rewire"]);
}

module.exports = { presets, plugins };
