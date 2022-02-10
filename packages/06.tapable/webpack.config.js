const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DonePlugin = require('./plugins/done-plugin');
const AssetsPlugin = require('./plugins/assets-plugin');
const ArchivePlugin = require('./plugins/archive-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  resolveLoader: {
    modules: [path.resolve(__dirname, 'loaders')]
  },
  devtool: 'source-map',
  plugins: [new HtmlWebpackPlugin(), new ArchivePlugin()],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  }
};
