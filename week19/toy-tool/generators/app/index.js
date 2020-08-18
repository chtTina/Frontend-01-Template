/*
 * @Descripttion:
 * @version:
 * @Author: tina.cai
 * @Date: 2020-08-16 15:06:21
 * @LastEditors: tina.cai
 * @LastEditTime: 2020-08-16 19:12:26
 */
var Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }

  collecting() {
    this.log("collecting");
  }

  creating() {
    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json"),
      { title: "Templating with Yeoman" }
    );
    this.fs.copyTpl(
      this.templatePath("createElement.js"),
      this.destinationPath("lib/createElement.js")
    );
    this.fs.copyTpl(
      this.templatePath("main.js"),
      this.destinationPath("src/main.js")
    );
    this.fs.copyTpl(
      this.templatePath("main.test.js"),
      this.destinationPath("test/main.test.js")
    );
    this.fs.copyTpl(
      this.templatePath("index.html"),
      this.destinationPath("src/index.html"),
      { title: "Templating with Yeoman" }
    );
    this.fs.copyTpl(
      this.templatePath("webpack.config.js"),
      this.destinationPath("webpack.config.js")
    );
    this.fs.copyTpl(
      this.templatePath(".nycrc"),
      this.destinationPath(".nycrc")
    );
    this.fs.copyTpl(
      this.templatePath(".babelrc"),
      this.destinationPath(".babelrc")
    );
    this.npmInstall(
      [
        "webpack",
        "webpack-cli",
        "webpack-dev-server",
        "babel-loader",
        "@babel/core",
        "@babel/preset-env",
        "@babel/register",
        "@babel/plugin-transform-react-jsx",
        "html-webpack-plugin",
        "mocha",
        "nyc",
        "@istanbuljs/nyc-config-babel",
        "babel-plugin-istanbul",
      ],
      {
        "save-dev": true,
      }
    );

    // this.fs.copyTpl(
    //   this.templatePath("index.html"),
    //   this.destinationPath("public/index.html"),
    //   { title: "Templating with Yeoman" }
    // );
  }
};
