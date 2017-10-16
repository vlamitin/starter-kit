const webpack = require('webpack');

const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack-common.config.js');

const config = webpackMerge(commonConfig, {
    devtool: '',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
                'BACKEND': JSON.stringify(process.env.BACKEND || 'real'),
            }
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
    ]
});

module.exports = config;