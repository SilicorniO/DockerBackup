const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const webpack = require("webpack")
const path = require("path")

var nodeModules = {}

module.exports = {
  name: "server",
  entry: "./src/server.js",
  target: "node",
  node: {
    __dirname: false,
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
    alias: {
      root: __dirname,
      src: path.resolve(__dirname, "../src"),
    },
    plugins: [],
    modules: [path.resolve(__dirname, "../src"), "node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: ["ts-loader", "source-map-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.ts?$/,
        use: "eslint-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: "source-map-loader",
      },
    ],
  },
  devtool: "source-map",
  plugins: [new webpack.ProgressPlugin(), new CleanWebpackPlugin({})],
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "server.js",
  },
}
