## Hot Module Replacement

* [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/)
* [npm run script](https://docs.npmjs.com/cli/v8/commands/npm-run-script#description)
* [bin field](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#bin)

`package.json`:

```json
{
  "scripts": {
    "build": "webpack"
  }
}
```

it will execute `node_modules/.bin/webpack`, this is a shell script

### Reference

* [hrm 原理解析](https://zhuanlan.zhihu.com/p/30669007)
* [webpack-hmr](https://github.com/careteenL/webpack-hmr)
