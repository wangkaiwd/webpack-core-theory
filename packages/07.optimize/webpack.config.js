const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const PATHS = {
  src: path.join(__dirname, 'src')
};
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    // new BundleAnalyzerPlugin(),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new MiniCssExtractPlugin({ filename: '[name].css', }),
    new PurgecssPlugin({
      // need to specify html file
      paths: [path.join(__dirname, 'index.html'), ...glob.sync(`${PATHS.src}/**/*`, { nodir: true })],
    })
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  }
};
