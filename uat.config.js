const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const TextExtractPlugin = require('extract-text-webpack-plugin')
const outPut = 'axis-shared/'
const AppExtractor = new TextExtractPlugin({
    filename: "[name]/css/app.css"
})

module.exports = {
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: [
                'babel-loader'
            ]
        }, {
            test: /\.less$/,
            exclude: [
                path.resolve(__dirname, 'node_modules')
            ],
            use: AppExtractor.extract({
                use: [
                    'css-loader',
                    'less-loader'
                ]
            })
        }, {
            test: /\.svg$/,
            include: path.resolve(outPut + 'icons'),
            issuer: {
                test: /\.(less|css)?$/
            },
            use: [{
                loader: 'svg-sprite-loader',
                options: {
                    extract: true,
                    spriteFilename: outPut + 'icons/sprite-icon.svg'
                }
            }, {
                loader: 'svgo-loader',
                options: {
                    plugins: [{
                        removeTitle: true
                    }, {
                        convertColors: {
                            shorthex: false
                        }
                    }, {
                        convertPathData: false
                    }]
                }
            }]
        }, {
            test: /\.svg$/,
            issuer: {
                test: /\.jsx?$/
            },
            loader: 'svgr/webpack',
            options: {
                ids: true,
                dimensions: true,
                title: false
            }
        }]
    },
    plugins: [
        AppExtractor,
        new SpriteLoaderPlugin()
    ]
}
