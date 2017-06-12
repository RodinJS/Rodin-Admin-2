/**
 * Created by xgharibyan on 6/7/17.
 */

const webpack = require('webpack');
const path = require('path');

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
    module:{
        rules: [
            {
                test : /\.js?/,
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                enforce: "pre",
                enforce: "post",
                loader: "babel-loader",
                options: {
                    presets: ["es2015", 'react'],
                },
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            }
        ]
    }
};