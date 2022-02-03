<template>
  <div class="app">
    <img src="./assets/github.jpeg" alt="">
    <img :src="image" alt="">
    <div class="image"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import image from './assets/github.jpeg';

export default defineComponent({
  name: 'App',
  setup () {
    const state = reactive({});
    return {
      ...toRefs(state),
      image
    };
  },
});
</script>

<style lang="less" scoped>
.app {
  .image {
    width: 200px;
    height: 115px;
    background-image: url(./assets/github.jpeg);
    background-size: 100% 100%;
  }
}
</style>
