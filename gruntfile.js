const path = require('path')
const webpack = require('webpack')
const projects = require('./projects.config.js')
const basicConfig = require('./basic.config.js')
const uatConfig = require('./uat.config.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const uatOutPut = '_output/latest/'
const basicOutPut = {
    publicPath: '{custom:cdn}/_shared/axis-ui/{CCL:axis-ui.version}/',
    filename: '[name]/js/app.js'
}
const htmlPluginOption = (project, output) => {
    return {
        filename: __dirname + '/' + output + project + '/index.html',
        chunks: [project, 'axis-shared'],
        template: __dirname + '/' + project + '/index.html'
    }
}
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt)
    require('time-grunt')(grunt)

    grunt.initConfig({
        webpack: {
            options: basicConfig,
            'uat': {
                output: Object.assign({}, {
                    path: __dirname + '/' + uatOutPut,
                }, basicOutPut),
                module: uatConfig.module,
                plugins: [
                    ...basicConfig.plugins,
                    ...uatConfig.plugins,
                    ...projects.map(project => new HtmlWebpackPlugin(htmlPluginOption(project, uatOutPut)))
                ],
                mode: 'development'
            }
        },
        clean: {
            uat: [uatOutPut]
        }
    })
    grunt.registerTask('latest', ['clean:uat', 'webpack:uat'])
}
