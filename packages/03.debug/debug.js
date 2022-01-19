import webpack from 'webpack';
import config from './webpack.config.js';

const compiler = webpack(config);
compiler.run((err, stats) => {
  console.log(err);
  console.log(stats.toJson({
    assets: true,
    chunks: true,
    modules: true,
    entries: true
  }));
});
