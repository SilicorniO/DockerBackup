const webpack = require("webpack")
const { merge } = require("webpack-merge")
const common = require("./webpack.common.js")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = merge(common, {
  devtool: "inline-source-map",
  plugins: [
    new CopyWebpackPlugin(
      {
        patterns: [
          {
            from: "./configuration/configuration.pro.json",
            to: "./configuration.json",
          },
        ],
      },
      { debug: "info" },
    ),
    new webpack.DefinePlugin({
      "process.env.NAME": '"production"',
    }),
  ],
  mode: "production",
})
