<template>
  <div class="app">
    App
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';

export default {
  name: 'App',
  setup () {
    const state = reactive({});
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="less" scoped>
.app {
}
</style>
