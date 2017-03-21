<template>
  <div>
    <timer></timer>
    <baidu></baidu>
  </div>
</template>
<script>
  import baidu from '../components/baiduMap.vue'
  import timer from '../components/timer.vue'
  export default{
    components: {
      baidu,
      timer
    }
  }
</script>
