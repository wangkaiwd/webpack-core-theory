import path from 'path';

export default {
  entry: './src/index.js',
  mode: 'development',
  devtool: false,
  output: {
    filename: 'main.js',
    path: path.resolve(path.resolve(''), 'dist'),
  },
};
