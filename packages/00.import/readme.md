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
    // esModule -> getter
    module.exports = {
      get default () {
        return 'title';
      }
    };
    // common.js -> assign value directly
    module.exports.default = 'title';
  }
};
const cache = {}; // avoid circular import and repeat import
// variable require has used by node.js, so there prefix `_` for it
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
mix commonjs and esModule:

```js
// esModule access module.default
// commonjs access module directly
__webpack_require__.n = (module) => {
  /******/
  var getter = module && module.__esModule ?
    /******/        () => (module['default']) :
    /******/        () => (module);
  /******/
  __webpack_require__.d(getter, { a: getter });
  /******/
  return getter;
  /******/
};
```

source code
```js
// title.js
const title = 'title'
export { title }

// index.js
const title = require('title')
// title === module.exports.default === undefined
console.log('title',title)
```

`export` and `require`
```js

var __webpack_modules__ = ({
  './src/title.js':
  ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */
    __webpack_require__.d(__webpack_exports__, {
      /* harmony export */   'title': () => (/* binding */ title)
      /* harmony export */
    });
    const title = 'title';
  })
});
// ...some other code
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
  /*!**********************!*\
    !*** ./src/index.js ***!
    \**********************/
  __webpack_require__.r(__webpack_exports__);
  /* harmony import */
  var _title__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./title */ './src/title.js');
  // const title = require('./title');
  // export default will auto access defualt property by webpack
  console.log('title', _title__WEBPACK_IMPORTED_MODULE_0__['default']);
})();
```
  
source code
```js
// title.js
export default 'title'

// index.js
const title = require('./title')
// title = module.exports = { get default() { return 'title'}}
// module.exports.default = 'title'
console.log('title',title)
```
output:
```text
title Object [Module] { default: [Getter] }
```

**caveat: esModule default export will add `default` property for `module.exports` object and `import xxx from './xxx'` will access `module.exports.default`**

esModule:
```js
let age
const exports = {
  get xxx() {
    return age 
  }
}
age = 10
```

commonjs：
```js
let age
const exports = {
  xxx: age
}
age = 10
```

esModule always access final value by getter but commonjs not
