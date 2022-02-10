const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DonePlugin = require('./plugins/done-plugin');
const AssetsPlugin = require('./plugins/assets-plugin');
const ArchivePlugin = require('./plugins/archive-plugin');
const AutoExternalPlugin = require('./plugins/auto-external-plugin');
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  resolveLoader: {
    modules: [path.resolve(__dirname, 'loaders')]
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new AutoExternalPlugin({
      jquery: {
        variable: 'jQuery',
        url: 'https://releases.jquery.com/git/jquery-git.min.js'
      },
      lodash: {
        variable: '_',
        url: 'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.js'
      }
    })
  ],
  externals: {
    jquery: 'jQuery'
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  }
};
