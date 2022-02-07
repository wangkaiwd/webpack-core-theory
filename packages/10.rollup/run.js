const rollup = require('./lib/rollup');
const path = require('path');

const entry = path.resolve(__dirname, './src/main.js');
rollup(entry,'bundle.js')
