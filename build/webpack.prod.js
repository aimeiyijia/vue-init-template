// 合并webpack配置
const merge = require("webpack-merge"),
	common = require("./webpack.base"),
	path = require("path"),

	// 清理打包文件
	{ CleanWebpackPlugin } = require("clean-webpack-plugin"),

	// 将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件，支持按需加载css和sourceMap
	MiniCssExtractPlugin = require("mini-css-extract-plugin"),
	OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
	TerserPlugin = require("terser-webpack-plugin"),
	BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin,
	ManifestPlugin = require("webpack-manifest-plugin");

module.exports = merge(common, {
	mode: "production",
	output: {
		filename: "js/[name].[hash:5].js",
		path: path.resolve(__dirname, "../dist"),
	},
	// stats: { children: false },
	optimization: {
		splitChunks: {
			chunks: "all",
			cacheGroups: {
				vendor: {
					name: "vendor",
					test: /[\\/]node_module[\\/]/,
					priority: -10,
					chunks: "initial",
				},
			},
		},
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					warnings: false,
					console: false,
					compress: {},
				},
				cache: true,
				parallel: true,
				sourceMap: true,
			}),
		],
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: "./",
						},
					},
					"css-loader",
					"postcss-loader",
					"sass-loader",
				],
			},
			{
				test: /\.(png|jpg|svg|gif|jpe?g)$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 10240,
							name: "imgs/[name].[contenthash:5].[ext]",
						},
					},
				],
			},
		],
	},
	plugins: [
		new ManifestPlugin(),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: "css/[name].[hash:5].css",
		}),
		new OptimizeCSSAssetsPlugin(),
		// new BundleAnalyzerPlugin({
		// 	analyzerMode: "static",
		// 	openAnalyzer: true,
		// 	logLevel: "info",
		// }),
	],
});
