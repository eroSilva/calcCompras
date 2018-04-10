const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const PATHS = {
	src: path.resolve(__dirname, '../src'),
	build: path.resolve(__dirname, '../dist')
}

const commonConfig = {
	entry: {
		app: [
			`${PATHS.src}/js/app.js`,
			`${PATHS.src}/styles/app.scss`
		],
	},
	output: {
		filename: '[name].js',
		path: PATHS.build,
	},
	module: {
		rules: [
			{
				test: /\.(jpg|png|svg)$/,
				use: {loader: 'url-loader'}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Webpack',
			template: `${PATHS.src}/index.html`
		}),
		
		new WebpackPwaManifest({
			filename: "manifest.json",
			fingerprints: false,

			name: 'CalcCompras, calculadora de compras',
			short_name: 'CalcCompras',
			description: 'CalcCompras, sua compra muito mais controlada!',
			background_color: '#ffffff',
			icons: [
			  	{
					src: `${PATHS.src}/img/icon.png`,
					sizes: [96, 128, 192, 256, 384, 512],
					destination: path.join('img', 'icons')
			  	}
			]
		})
	]
}

module.exports = {PATHS, commonConfig}