const webpack = require('./webpack.js');
const config = require('../webpack.config.js');

const compiler = webpack(config);

compiler.run((err, stats) => {
  console.log(err, stats);
});
