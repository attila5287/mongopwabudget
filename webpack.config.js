const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
	mode: 'production',
	entry: {
		jquery: './public/assets/src/jquery-3.js',
		jquery: './public/assets/src/jquery.js',
		popper: './public/assets/src/popper.min.js',
		bootstrap: './public/assets/src/bootstrap.js'
	},
	output: {
		path: __dirname + '/public/dist',
		filename: '[name].bundle.js'
	},
	plugins: [
		new WebpackPwaManifest({
			fingerprints: false,
			inject: false,
			name: 'Mongo Budget Tracker',
			short_name: 'Mongo Budget',
			description: 'Full stack budget tracker app with db',
			background_color: '#01579b',
			theme_color: '#ffffff',
			start_url: '/',
			icons: [
				{
					src: path.resolve('public/assets/images/icons/icon-128x128.png'),
					sizes: [32, 48, 64, 72, 96, 128, 256, 512],
					destination: path.join('assets', 'icons')
				}
			]
		})
	],
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	}
};
module.exports = config;
