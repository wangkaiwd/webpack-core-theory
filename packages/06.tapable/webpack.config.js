const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DonePlugin = require('./plugins/done-plugin');
const AssetsPlugin = require('./plugins/assets-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  resolveLoader: {
    modules: [path.resolve(__dirname, 'loaders')]
  },
  devtool: 'source-map',
  plugins: [new HtmlWebpackPlugin(), new AssetsPlugin()],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  }
};
