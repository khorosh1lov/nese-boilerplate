const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
	mode: 'development',
	target: 'node',
	entry: {
		server: './src/server.js',
		main: './src/js/main.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js',
		clean: true,
		publicPath: '',
	},
	watch: true,
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [require('autoprefixer')],
							},
						},
					},
					'sass-loader',
				],
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf)$/,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name][ext]',
				},
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'images/[name][ext]',
				},
			},
		],
	},
	externals: [nodeExternals()],
	resolve: {
		extensions: ['.js', '.jsx', '.json'],
	},
	optimization: {
		minimize: true,
		minimizer: [new CssMinimizerPlugin()],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'styles.css',
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src', 'views'),
					to: path.resolve(__dirname, 'dist', 'views'),
				},
				{
					from: path.resolve(__dirname, 'src', 'images'),
					to: path.resolve(__dirname, 'dist', 'images'),
				},
			],
		}),
	],
};
