const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  resolveLoader: {
    modules: [path.resolve(__dirname, 'loaders')]
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
      {
        test: /\.jpeg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              filename: '[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin()],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  }
};
