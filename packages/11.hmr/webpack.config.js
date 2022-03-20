const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  context: path.resolve(),
  devServer: {
    // default is only ?
    hot: true
  },
  plugins: [new HtmlWebpackPlugin({ template: 'index.html' })],
  output: {
    filename: '[name].js'
  }
};
