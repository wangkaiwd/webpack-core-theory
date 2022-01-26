const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  resolveLoader: {
    modules: [path.resolve(__dirname, 'loaders')]
  },
  devtool: 'source-map',
  plugins: [new HtmlWebpackPlugin()],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  }
};
