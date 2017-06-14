/**
 * Created by xgharibyan on 6/7/17.
 */

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'build');
const APP_DIR = path.resolve(__dirname, 'client');


module.exports = {
    context: APP_DIR,
    entry: {
        app: './index.js',
    },
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
    },
    watchOptions: {
        aggregateTimeout: 300, // <---------
        poll: 1000, // <---------
        ignored:  path.resolve(__dirname, "node_modules")
    },
    module: {
        rules: [
            {
                test: /\.js?/,
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                //enforce: "pre",
                //enforce: "post",
                loader: "babel-loader",
                options: {
                    presets: ["es2015", 'react'],
                },
            },
            /*{
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },*/
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.scss$/,
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',

                    // Could also be write as follow:
                    // use: 'css-loader?modules&importLoader=2&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader'
                    use: [
                        {
                            loader: 'css-loader',
                            query: {
                                modules: true,
                                sourceMap: true,
                                importLoaders: 2,
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            }
                        },
                        'sass-loader'
                    ]
                }),
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin("build/style.css"),
    ]
};