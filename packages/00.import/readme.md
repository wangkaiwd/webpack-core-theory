## compatible module import

webpack simulate implement commonjs specification


esModule convert to commonjs

index.js
```js
import title from './title';

console.log('title', title);
```
title.js
```js
export default 'title'
```

dist source code after compiled:
```js
const modules = {
  './src/title': (module, exports, require) => {
    module.exports.default = 'title';
  }
};
const cache = {};

const _require = (moduleId) => {
  if (cache[moduleId]) {
    return cache[moduleId].exports;
  }
  const module = cache[moduleId] = {
    exports: {}
  };
  modules[moduleId](module, module.exports, _require);
  return module.exports;
};

const title = _require('./src/title');
console.log('title', title.default);
```

