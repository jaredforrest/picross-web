const path = require("path");
//const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

module.exports = {
  //mode: "development",
  target: ["web", "es5"],
  mode: "production",
  entry: {
    //index: "./src/index.js"
    index: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
//    filename: "[name].js"
  },
  optimization: {
      minimize: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
    ]
  },
  resolve: {
    extensions: ['.js'],
  },
/*  resolve: {
    modules: [path.resolve(__dirname, 'src')],
    extensions: ['.ts','.js'],
  },*/
};
