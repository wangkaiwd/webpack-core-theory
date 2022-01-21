const path = require('path');
const RunPlugin = require('./src/plugins/run.js');
const DonePlugin = require('./src/plugins/done.js');

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
          path.resolve(dirname, 'src', 'loaders', 'logger1-loader'),
          path.resolve(dirname, 'src', 'loaders', 'logger2-loader')
        ]
      },
    ],
  },
  plugins: [
    new RunPlugin(),
    new DonePlugin()
  ]
};
