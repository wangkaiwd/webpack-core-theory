## vite
### handle assets url
example for image:
* directly use in template
```vue
<template>
  <img src="src/assets/github.jpeg"/>
</template>
```
* import by js
```vue
<script>
import image from './src/assets/github.jpeg'
</script>
```
* use in css
```vue
<style scoped>
.image {
  background-image: url("src/assets/github.jpeg");
}
</style>
```

vite will transform url to `/src/assets/github.jpeg`

### module css
* [use in template](https://github.com/vitejs/vite/issues/937)

### other
* [typescript](https://vitejs.dev/guide/features.html#typescript)
  * [client-types](https://vitejs.dev/guide/features.html#client-types)
  * [triple slash directive](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html#-reference-types-)

### theory
* create static http server(koa)
* replace import module `vue` path
