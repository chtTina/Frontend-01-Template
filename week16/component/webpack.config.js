/*
 * @Descripttion:
 * @version:
 * @Author: tina.cai
 * @Date: 2020-07-14 00:24:39
 * @LastEditors: tina.cai
 * @LastEditTime: 2020-07-18 13:51:27
 */

module.exports = {
  entry: "./main.js",
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
      {
        test: /\.view/,
        use: require.resolve("./myloader.js"),
      },
    ],
  },
  mode: "development",
  optimization: {
    minimize: false,
  },
};
