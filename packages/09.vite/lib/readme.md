## theory
* create static http server(koa)
* replace import module `vue,@vue/xxx` path
```js
// browser only resolve / ./ ../ 
import { createApp } from 'vue' 
```
* compile single file component(`compiler-sfc`)
  * `App.vue`

### technology
* koa 
* [es-module-lexer](https://github.com/guybedford/es-module-lexer)
