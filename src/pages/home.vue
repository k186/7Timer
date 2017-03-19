<template>
  <div>{{someData}}</div>
</template>
<script>
  export default{
    data () {
      return {
        someData: ''
      }
    },
    mounted () {
      this.$http.headers = {'Access-Control-Allow-Origin': '*'}
      this.$http.get('http://ftp.astron.ac.cn/v4/bin/civil.php?lon=113.17&lat=23.09&ac=0&lang=en&output=json&tzshift=0').then(response => {
        this.someData = response.body
      }, response => {
        console.log(response.body)
      })
    }
  }
</script>
