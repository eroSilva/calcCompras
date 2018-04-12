const { PATHS } = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const Autoprefixer = require('autoprefixer');

const prodConfig = {
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: true
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: () => [Autoprefixer()]
							}
						},
						{
							loader: 'sass-loader',
						},
					]
				})
			}
		]
	},
	plugins: [
		new WebpackCleanupPlugin('dist'),
		new ExtractTextPlugin('[name].css')
	]
}

module.exports = prodConfig;