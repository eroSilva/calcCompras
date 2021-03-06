const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');

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
			title: 'Progressive Web Application',
			template: `${PATHS.src}/index.html`
		}),
		
		new WebpackPwaManifest({
			filename: "manifest.json",
			fingerprints: false,

			name: 'CalcCompras',
			short_name: 'CalcCompras',
			description: 'CalcCompras, sua compra muito mais controlada!',
			start_url: '.',
			background_color: '#90bff1',
			theme_color: '#90bff1',
			icons: [
			  	{
					src: `${PATHS.src}/img/icon.png`,
					sizes: [256, 384, 512],
					destination: './',
					inject: true
			  	}
			]
		}),

		new WorkboxPlugin.GenerateSW({
			clientsClaim: true,
			skipWaiting: true
		})
	]
}

module.exports = {PATHS, commonConfig}