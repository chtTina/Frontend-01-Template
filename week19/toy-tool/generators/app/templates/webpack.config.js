/*
 * @Descripttion:
 * @version:
 * @Author: tina.cai
 * @Date: 2020-08-16 16:08:10
 * @LastEditors: tina.cai
 * @LastEditTime: 2020-08-16 18:14:10
 */
module.exports = {
  entry: "./src/main.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              ["@babel/plugin-transform-react-jsx", { pragma: "create" }],
            ],
          },
        },
      },
    ],
  },
  mode: "development",
  optimization: {
    minimize: false,
  },
  plugins: [new (require("html-webpack-plugin"))()],
  devServer: {
    open: true,
    compress: false,
    contentBase: "./dist",
  },
};
