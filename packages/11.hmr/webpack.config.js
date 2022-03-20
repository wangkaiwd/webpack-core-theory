const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  context: path.resolve(),
  plugins: [new HtmlWebpackPlugin()],
  output: {
    filename: '[name].js'
  }
};
