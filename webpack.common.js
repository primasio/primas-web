const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: {
        app: './src/app/app.js',
        vendor:[
            "angular",
            "angular-translate",
            "angular-translate-loader-static-files",
            "@uirouter/angularjs",
            "angulartics",
            "angulartics-google-analytics",
            "jquery",
            "normalize.css",
            "processing-js",
            "restangular",
            "angular-filesize-filter"
        ]
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    }
    ,
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    'html-loader'
                ]
            },
            {
                test: /\.json$/,
                use: [
                    'json-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['ng-annotate-loader',{
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),//清除dist
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'//依赖模块
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'//公共模块
        }),
        new CopyWebpackPlugin([{ from: 'src/app/i18n', to: 'i18n' }]),
        new CopyWebpackPlugin([{ from: 'src/app/pdf', to: 'pdf' }]),
        new webpack.ProvidePlugin({
            "window.jQuery": "jquery",
            "$": "jquery",
            "jQuery": "jquery"
        })

    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')//声明变量被其他模块引用
        }
    },
};
