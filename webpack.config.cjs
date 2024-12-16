const path = require("path");
const webpack = require("webpack"); // Import webpack

module.exports = {
	entry: {
		dropdown: "./dropdown.ts",
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname),
	},
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
		],
	},
	experiments: {
		asyncWebAssembly: true,
	},
};
