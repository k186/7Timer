<template>
  <div class="k-Timer-box">
    <img :src="origin + src" alt="">
  </div>
</template>
<script>
  export default{
    data () {
      return {
        origin: 'http://ftp.astron.ac.cn/v4/bin/astro.php?'
      }
    },
    props: {
      src: {
        type: String,
        required: true,
      }
    }
  }
</script>
