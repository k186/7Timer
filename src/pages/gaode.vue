<template>
  <div>
    <timer></timer>
    <gaode></gaode>
  </div>
</template>
<script>
  import gaode from '../components/gaodeMap.vue'
  import timer from '../components/timer.vue'
  export default{
    components: {
      gaode,
      timer
    }
  }
</script>
