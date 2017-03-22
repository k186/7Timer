<template>
  <div>
    <timer></timer>
    <google></google>
  </div>
</template>
<script>
  import google from '../components/googleMap.vue'
  import timer from '../components/timer.vue'
  export default{
    components: {
      google,
      timer
    }
  }
</script>
<style lang="scss" src="../main.scss"></style>
