const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

const { resolve } = require('path');

const buildPath = resolve(__dirname, '../build/static');
const nodeModulesPath = resolve(__dirname, '../node_modules');
const faviconPath = resolve(__dirname, '../src/assets/img/favicon.ico');
const settingsPath = resolve(__dirname, '../src/settings/settings.json');

module.exports = {

    entry: {
        index: resolve(__dirname, '../src/index.jsx'),
        vendor: resolve(__dirname, '../src/vendors.js'),
        polyfill: resolve(__dirname, '../src/polyfills.js')
    },

    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss']
    },

    output: {
        path: buildPath,
        publicPath: '/',
        filename: '[name].[hash:6].bundle.js',
        chunkFilename: '[id].[chunkhash:6].chunk.js'
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ContextReplacementPlugin(/\.\/locale/, /ru|en-gb/),
        new webpack.ProvidePlugin({
            "Highcharts": "highcharts"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            chunks: ['vendor', 'index']
        }),
        new ExtractTextPlugin({
            filename: 'style.[contenthash:6].css',
            allChunks: true,
            disable: NODE_ENV === 'development'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'StarterKit',
            favicon: faviconPath,
            template: resolve(__dirname, '../src/components/www/index.html'),
            chunks: ['common', 'vendor', 'polyfill', 'index']
        }),
        new CopyWebpackPlugin([
            { from: settingsPath, to: 'settings.json' },
            { from: faviconPath, to: 'favicon.ico' }
        ])
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader', 'eslint-loader'],
                exclude: [nodeModulesPath]
            },
            {
                test: /\.(png|jpg|ttf|eot|woff|woff2|ico)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[hash:6].[ext]'
                    }
                },
                exclude: [nodeModulesPath]
            },
            {
                test: /\.svg$/,
                use: 'raw-loader',
                exclude: [nodeModulesPath]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'resolve-url-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        },
                        'resolve-url-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                }),
                exclude: [nodeModulesPath]
            }
        ],
    }
};
