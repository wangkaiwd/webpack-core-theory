const path = require('path');
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: false,
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                [path.resolve(__dirname, 'src/babel-plugin-import'),
                  {
                    'libraryName': 'lodash',
                    'libraryDirectory': '',
                    'camel2DashComponentName': false  // default: true
                  }
                ]
              ]
            }
          }
        ]
      }
    ]
  }
};
