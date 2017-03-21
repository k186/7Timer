<template>
  <div class="k-Timer-box">
    <img :src="origin + src" alt="">
  </div>
</template>
<script>
  import tool from '../tools/tools'
  import {mapGetters} from 'vuex'
  export default{
    data () {
      return {
        origin: 'http://ftp.astron.ac.cn/v4/bin/astro.php?'
      }
    },
    computed: {
      ...mapGetters({
        Timer7: 'Timer7'
      }),
      src () {
        return tool.parseData(this.Timer7.options)
      }
    }
  }
</script>
