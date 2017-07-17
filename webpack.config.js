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
            // Javascript
            {
                test: /\.js$/,
                exclude: /(node_modules)/,

                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["es2015", 'react'],
                        "plugins": ["transform-object-rest-spread"]
                    }
                },
            },
            // Stylesheets
            { test: /\.scss$/, loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?sourceMap!sass-loader?sourceMap'}) },
            // Font Definitions
            { test: /\.svg$/, loader: 'url-loader?limit=65000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]' },
            { test: /\.woff$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]' },
            { test: /\.woff2$/, loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]' },
            { test: /\.[ot]tf$/, loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]' },
            { test: /\.eot$/, loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]' }
        ]
    },
    plugins: [
        new ExtractTextPlugin("style.css"),
    ]
};