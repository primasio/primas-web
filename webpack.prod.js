const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
module.exports = merge(common, {
    devtool: 'source-map',
    output: {
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 95
                            },
                            pngquant: {
                                quality: '95',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            }
                        }
                    }
                ]
            }
        ]

    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.production.html',
            inject: 'body',
            hash: true,
            favicon: 'src/favicon.ico',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                minifyJS: true,
                minifyCSS: true
            }
        }),
        // Reduces bundles total size
        new UglifyJSPlugin({
            mangle: {

                // You can specify all variables that should not be mangled.
                // For example if your vendor dependency doesn't use modules
                // and relies on global variables. Most of angular modules relies on
                // angular global variable, so we should keep it unchanged
                except: ['$super', '$', 'exports', 'require', 'angular']
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')//提示webpack当前是生产环境
            }
        })
    ]
});