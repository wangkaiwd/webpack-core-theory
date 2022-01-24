const path = require('path');
const RunPlugin = require('./lib/plugins/run.js');
const DonePlugin = require('./lib/plugins/done.js');

const dirname = path.resolve('.');
module.exports = {
  entry: {
    main: './src/main.js'
  },
  mode: 'development',
  devtool: false,
  output: {
    filename: 'main.js',
    path: path.resolve(path.resolve(''), 'dist'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          path.resolve(dirname, 'lib', 'loaders', 'logger1-loader'),
          path.resolve(dirname, 'lib', 'loaders', 'logger2-loader')
        ]
      },
    ],
  },
  plugins: [
    new RunPlugin(),
    new DonePlugin()
  ]
};
