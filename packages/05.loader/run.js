const { runLoaders } = require('loader-runner');
const path = require('path');
const fs = require('fs');

const entry = path.resolve(__dirname, './src/index.js');

const request = `-!inline-loader2!inline-loader1!${entry}`;
// from right to left
// from down to up
const rules = [
  {
    test: /\.js$/,
    enforce: 'pre',
    use: ['pre-loader2', 'pre-loader1']
  },
  {
    test: /\.js$/,
    use: ['normal-loader2', 'normal-loader1']
  },
  {
    test: /\.js$/,
    enforce: 'post',
    use: ['post-loader2', 'post-loader1']
  }
];

const preLoaders = [];
const normalLoaders = [];
const postLoaders = [];
let inlineLoaders = [];
rules.forEach(r => {
  if (!r.test.test(entry)) {
    return;
  }
  switch (r.enforce) {
    case 'pre':
      preLoaders.push(...r.use);
      break;
    case 'post':
      postLoaders.push(...r.use);
      break;
    default:
      normalLoaders.push(...r.use);
      break;
  }
});

function parseInlineLoaders (inlineString) {
  const reg = /^(-?!{1,2})/;
  const match = reg.exec(inlineString);
  let string = inlineString;
  if (match) {
    string = inlineString.slice(match[0].length);
  }
  return string.split('!').slice(0, -1);
}

inlineLoaders = parseInlineLoaders(request);

// console.log(postLoaders, inlineLoaders, preLoaders, normalLoaders);
let loaders = [];
if (request.startsWith('!!')) {
  loaders = [...inlineLoaders];
} else if (request.startsWith('-!')) {
  loaders = [...postLoaders, ...inlineLoaders];
} else if (request.startsWith('!')) {
  loaders = [...postLoaders, ...inlineLoaders, ...preLoaders];
} else {
  loaders = [...postLoaders, ...inlineLoaders, ...normalLoaders, ...preLoaders];
}

const resolveLoader = (loader) => path.resolve(__dirname, 'loaders', loader);
runLoaders({
  resource: entry,
  // String: Absolute path to the resource (optionally including query string)
  loaders: loaders.map(resolveLoader),
  context: { minimize: true },
  readResource: fs.readFile.bind(fs)
}, function (err, result) {
  console.log(err, result);
  console.log(result.resourceBuffer.toString());
});
