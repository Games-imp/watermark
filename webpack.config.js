const webpack = require("webpack");

module.exports = {
  mode: "production",
  devtool: "eval-source-map",
  entry: __dirname + "/src/canvas/watermark.canvas.js",
  output: {
    path: __dirname + "/docs",
    filename: "watermark.canvas.js"
  },
  devServer: {
    contentBase: "./docs", //本地服务器所加载的页面所在的目录
    inline: true, //实时刷新
    port: 9100
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        },
        exclude: /node_modules/
      }
    ]
  }
};
