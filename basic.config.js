const path = require('path')
const webpack = require("webpack")
const projects = require("./projects.config.js")

let getFinalEntryByProjects = (projs) => {
    let finalEntry = {}
    projs.forEach(project => {
        finalEntry[project] = path.resolve(__dirname, project + '/containers/Structure/index.jsx')
    })
    return finalEntry
}

module.exports = {
    entry: getFinalEntryByProjects(projects),
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'axis-ui-shared': __dirname + '/axis-shared'
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "axis-shared",
                    chunks: "all"
                }
            }
        }
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en)$/)
    ]
}
