## Babel Plugin

* [writing your first Babel plugin](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#writing-your-first-babel-plugin)

Babel Plugin is an object like this:

```js
const plugin = {
  visitor: {
    // node type
    ExpressionStatement (path, state) {
      // do somthing
    }
  }
}
```

### arrow function to es5 function

* change function type
* handle `this`

### class to constructor function

* create node depend on previous node
* replace previous node with new multiple nodes

### Babel plugin import

* [babel-plugin-import](https://github.com/umijs/babel-plugin-import)
* usage of lodash

```js
import { flatten, clone } from 'lodash'

//       ↓ ↓ ↓ ↓ ↓ ↓

import flatten from 'lodash/flatten'
import clone from 'lodash/clone'
```

### Using a Plugin

* [Plugins](https://babeljs.io/docs/en/plugins)
