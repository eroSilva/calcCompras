const path = require('path');
const { PATHS } = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin')
const Autoprefixer = require('autoprefixer');

const prodConfig = {
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [Autoprefixer()]
						}
					},
					{
						loader: 'sass-loader'
					}
				],
			},
		],
	},
	plugins: [
		new WebpackCleanupPlugin('dist'),
		new MiniCssExtractPlugin('[name].css')
	]
}

module.exports = prodConfig;