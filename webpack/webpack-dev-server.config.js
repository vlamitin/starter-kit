const webpack = require('webpack');
const { resolve } = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack-common.config.js');

const buildPath = resolve(__dirname, '../build/SetCustomers');

const host = process.env.DEV_HOST || 'localhost';
const port = 4000;

const config = webpackMerge(commonConfig, {
    entry: {
        vendor: resolve(__dirname, '../src/vendors.js'),
        polyfill: resolve(__dirname, '../src/polyfills.js'),
        index: resolve(__dirname, '../src/index.jsx')
    },
    devServer: {
        watchOptions: {
            aggregateTimeout: 100,
            poll: true
        },
        historyApiFallback: true,
        compress: true,
        contentBase: buildPath,
        hot: true,
        publicPath: '/',
        host,
        port,
    },
    devtool: 'cheap-inline-module-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
            DEV_HOST: 'localhost'
        }),
        new OpenBrowserPlugin({ url: `http://${host}:${port}` }),
    ],
    externals: {
        'cheerio': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
    }
});

module.exports = config;
