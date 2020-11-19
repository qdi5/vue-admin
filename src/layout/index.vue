<template>
  <div class="app-wrapper">
    母板组件
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'Layout',
  computed: {
    sidebar () {
      return this.app.sidebar
    },
    device () {
      return this.app.device
    }
  }
}
</script>

<style>

</style>
