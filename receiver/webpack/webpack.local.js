const webpack = require("webpack")
const { merge } = require("webpack-merge")
const common = require("./webpack.common.js")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin")

module.exports = merge(common, {
  devtool: "inline-source-map",
  plugins: [
    new CopyWebpackPlugin(
      {
        patterns: [
          {
            from: "./configuration/configuration.local.json",
            to: "./configuration.json",
          },
        ],
      },
      { debug: "info" },
    ),
    new webpack.DefinePlugin({
      "process.env.NAME": '"development"',
    }),
    new FilterWarningsPlugin({
      exclude: /(Cannot find SourceMap.*|Can't resolve.*|Critical dependency: the request of a dependency is an expression)/,
    }),
  ],
  mode: "development",
})
