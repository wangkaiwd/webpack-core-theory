const webpack = require('./webpack.js');
const config = require('../webpack.config.js');

const compiler = webpack(config);

compiler.run((err, stats) => {
  // console.log(err, stats);
  console.log(JSON.stringify(stats.modules, null, 2));
  console.log(JSON.stringify(stats.chunks, null, 2));
  console.log(JSON.stringify(stats.assets, null, 2));
});
