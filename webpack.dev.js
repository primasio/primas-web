const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const options = merge(common, {
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    output: {
        filename: '[name].[hash].js',
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        host:'localhost',
        port: 7778,
        historyApiFallback: true,//如果未找到直接重定向到首页 并且把参数传给前端渲染
        hot: true
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: 'src/index.development.html',
            inject: 'body',
            hash: true,
            favicon: 'src/favicon.ico'
        }),
        new webpack.HotModuleReplacementPlugin(),//模块热更新 无刷新
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')//提示webpack当前是开发环境
            }
        })
    ]
});
module.exports=options;
