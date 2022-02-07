## theory

utility modern browser support `<script type='module' src='xxx'></script>` and resolve path and compile `.vue` file by http static server

### step
1. create static http server by koa
2. replace import 'xxx' with import '/@module/xxx'
```js
// browser only resolve / ./ ../ 
import { createApp } from 'vue' 
```
3. use real file path under `node_modules` to get module source
4. compile `.vue` file with [`compiler-sfc`](https://github.com/vuejs/core/blob/main/packages/compiler-sfc/README.md)

koa notice:
* static server default don't execute `next` function
* `res.end(body)` will execute after run all middlewares

### technology
* koa 
* [es-module-lexer](https://github.com/guybedford/es-module-lexer)
