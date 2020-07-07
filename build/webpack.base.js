const path = require("path"),
	VueLoaderPlugin = require("vue-loader/lib/plugin"),
	HTMLWebpackPlugin = require("html-webpack-plugin"),
	WebpackBar = require("webpackbar");

module.exports = {
	entry: "./src/entry/index.js",
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.vue$/,
				loader: "vue-loader",
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
			},
			{
				test: /\.(png|jpg|svg|gif|jpe?g)$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 5000,
							name: "imgs/[name].[ext]",
						},
					},
				],
			},
		],
	},
	plugins: [
		new VueLoaderPlugin(),
		new WebpackBar(),

		// new HTMLWebpackPlugin({
		// 	template: path.resolve(__dirname, "../public/index.html"),
		// }),
		new HTMLWebpackPlugin({
			title: "Development",
			template: path.resolve(__dirname, "../public/index.html"),
			inject: "body",
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true,
				// more options:
				// https://github.com/kangax/html-minifier#options-quick-reference
			},
		}),
	],
};
