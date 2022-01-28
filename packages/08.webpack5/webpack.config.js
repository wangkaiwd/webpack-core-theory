const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  optimization: {
    // production default: deterministic
    // development default: named
    chunkIds: 'deterministic',
    moduleIds: 'deterministic'
  },
  plugins: [new HtmlWebpackPlugin()],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  }
};
