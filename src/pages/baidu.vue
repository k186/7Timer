<template>
  <div>
    <timer :src="src"></timer>
    <baidu @eventHandle="setTimer"></baidu>
  </div>
</template>
<script>
  import baidu from '../components/baiduMap.vue'
  import timer from '../components/timer.vue'
  export default{
    data () {
      return {
        src: ''
      }
    },
    components: {
      baidu,
      timer
    },
    mounted () {
    },
    methods: {
      setTimer (data) {
        this.src = data
      }
    }
  }
</script>
