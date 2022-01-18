const core = require('@babel/core');
const babelPluginTransformEs2015ArrowFunctions = require('babel-plugin-transform-es2015-arrow-functions');
// const transform = require('./transform');
const source = `
  const sum = (a,b) => {
    console.log(this)
    return a + b
  }
`;
const { code } = core.transformSync(source, { plugins: [babelPluginTransformEs2015ArrowFunctions] });
console.log('code', code);
// console.log(transform(source).code);


