const Bundle = require('./Bundle');
const rollup = (entry, outputFile) => {
  const bundle = new Bundle({ entry });
  bundle.build(outputFile);
};

module.exports = rollup;
