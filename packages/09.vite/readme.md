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
