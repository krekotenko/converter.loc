const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const devMode = process.env.NODE_ENV == 'development';
const pathToPublic = './public/js'

module.exports = {
    entry: './dev/index.js',

    output: {
        filename: 'bundle.js',    
        path: path.resolve(__dirname, pathToPublic),
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json',
    }, 

    devtool: devMode ? 'inline-source-map' : false,

    watch: devMode,

    optimization: {
        minimizer: [ new UglifyJsPlugin(), new OptimizeCSSAssetsPlugin() ]
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env','@babel/react'],
                        plugins: ['@babel/proposal-class-properties', '@babel/plugin-proposal-object-rest-spread', '@babel/plugin-syntax-dynamic-import']
                    }
                }
            },
            {
                test: /\.(svg)$/,
                use: [{
                    loader: 'babel-loader'
                }, {
                    loader: 'react-svg-loader'
                }]
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx'],
    },

    plugins: [

    ]    
};