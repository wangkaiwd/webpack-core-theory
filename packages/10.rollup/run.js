const rollup = require('./lib/rollup');
const path = require('path');

const entry = path.resolve(__dirname, './src/main.js');
// write all code to single file
rollup(entry,'bundle.js')
