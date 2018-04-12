const webpack = require('webpack');
const {PATHS} = require('./webpack.common.js');
const Autoprefixer = require('autoprefixer');

const devConfig = {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: PATHS.build,
		open: true,
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {sourceMap: true}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [Autoprefixer()],
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {sourceMap: true}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	]
}

module.exports = devConfig;