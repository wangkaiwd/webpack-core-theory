
## tapable

* [tapable](https://github.com/webpack/tapable)

### [types of hooks](https://github.com/webpack/tapable#hook-types)
* basic hook
* waterfall
* bail
* loop

### extends

parent class member properties and prototype methods will be added to child class

### write webpack plugin
* [Plugin Api](https://webpack.js.org/api/plugins/)
### ArchivePlugin

[add new assets demo](https://github.com/jantimon/html-webpack-plugin/blob/d5ce5a8f2d12a2450a65ec51c285dd54e36cd921/index.js?_pjax=%23js-repo-pjax-container%2C%20div%5Bitemtype%3D%22http%3A%2F%2Fschema.org%2FSoftwareSourceCode%22%5D%20main%2C%20%5Bdata-pjax-container%5D#L215-L223)

 ```text
 (node:6179) [DEP_WEBPACK_COMPILATION_ASSETS] DeprecationWarning: Compilation.assets will be frozen in future, all modifications are deprecated.
 BREAKING CHANGE: No more changes should happen to Compilation.assets after sealing the Compilation.
         Do changes to assets earlier, e. g. in Compilation.hooks.processAssets.
         Make sure to select an appropriate stage from Compilation.PROCESS_ASSETS_STAGE_*.
 ```
### AutoExternalPlugin

* [HookMap](https://github.com/webpack/tapable#hookmap)
* [HtmlWebpackPlugin events](https://github.com/jantimon/html-webpack-plugin#events)
  
### thinking 
* tap async hook still work ?

### implement
* reassign current function when current function executing 
```js
class Hook {
  constructor(args) {
    this.call = CALL_DELEGATE
    // some other code ...
  }
}
const CALL_DELEGATE = function(...args) {
	this.call = this._createCall("sync");
	return this.call(...args);
};

const hook = new Hook(['name','age'])
hook.call()
// invoke new create function in first executing
hook.call()
```
* [Usage of new Function](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-function-p1-p2-pn-body)


feature:
* SyncHook
* AsyncParallelHook
* Interceptor
* HookMap
* stage: set `tap` `fn`'s position in `taps` object
* before: `tap` `fn` position before which one in `taps` object
