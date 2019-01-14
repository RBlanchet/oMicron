<template>
  <div id="app">
    <transition name="fadeLeft" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>


<style lang="scss">
  @import "/style/main";
</style>
