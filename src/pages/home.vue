<template>
  <div>
    <div class="k-tips">当前状态:{{tips}}</div>
    <div class="k-main-title">晴天钟优化版-k186</div>
    <div class="k-nav-container">
      <router-link to="baidu" class="k-nav-go"><img class="k-btn-icon" src="./img/baidu.jpg" alt=""><span>百度</span></router-link>
      <router-link to="gaode" class="k-nav-go"><img class="k-btn-icon" src="./img/gaode.jpg" alt=""><span>高德</span></router-link>
      <router-link to="google" class="k-nav-go"><img class="k-btn-icon" src="./img/google.jpg" alt=""><span>谷歌</span></router-link>
     <!-- <a href="https://www.k186studio.com/tools/7Timer/google" class="k-nav-go"><img class="k-btn-icon" src="./img/google.jpg" alt=""><span>谷歌</span></a>-->
    </div>
    <p style="font-size: 14px;color: #2a9cd9;margin: 20px">本站已经开通https!!!!</p>
    <p style="font-size: 14px;color: #e8984c;margin: 20px">晴天钟官方接口极不稳定,如果无法加载出图片请间隔一段时间后重试</p>
    <div style="margin: 10px;">
      <p style="font-size: 14px;color: #333333;">使用说明</p>
      <p style="font-size: 14px;color: #333333;">简单说就是云度蓝色越多越好！视宁度越小越好！</p>
      <div style="width: 100%;overflow: scroll">
        <img src="./timerDESC.jpg" alt="">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        tips: '正常使用'
      }
    },
    mounted () {
      this.$http.get('./static/statu.json').then(response => {
        let data = JSON.parse(JSON.stringify(response.body)).tips
        if (data !== '') {
          this.tips = data
        }
      }, response => {

      })
    }
  }
</script>
