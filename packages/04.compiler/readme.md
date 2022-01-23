## compile flow

### handle step

1. get options from config file and command line
2. merge options
3. initial compiler by options
   1. initial compilation
   2. execute build logical
   3. iterate entries
      1. generate modules
      2. generate dependencies modules(employ `@babel/core,@babel/traverse,@babel/types,@babel/generator`)
      3. run loaders from right to left with sourcecode which read by `fs.readFile`
      4. generate chunks by modules
      5. generate assets by chunks
4. write source code to system directory with assets and `output` configuration
5. run all plugins in configuration
6. run compiler

final aim:

generate code which after compiler to specify directory

### core
current working directory is `root/src`, source code relationship as following: `main.js -> title.js -> content.js`
```js
// entry main.js
const title = require('./title.js')
// dependency title.js
const content = require('./content.js')
```

* modules
* chunks
* assets

### plugins

### loaders

### knowledge

* [fs.watch](https://nodejs.org/dist/latest-v16.x/docs/api/fs.html#fswatchfilename-options-listener)
* [path.relative](https://nodejs.org/dist/latest-v16.x/docs/api/path.html#pathrelativefrom-to)
