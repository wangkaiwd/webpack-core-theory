const path = require('path');
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  resolveLoader: {
    modules: [path.resolve(__dirname, 'loaders')]
  },
  devtool: false,
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
      }
    ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  }
};
