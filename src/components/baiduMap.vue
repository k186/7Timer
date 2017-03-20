<template>
  <div>
    <div class="k-map-box">
      <div class="k-map-line-box">
      </div>
      <div id="k-baidu-Map"></div>
    </div>
    <div class="k-map-control">
      <div>
        <input class="k-map-input" type="text" placeholder="输入地名搜索" v-model="address">
      </div>
      <div class="k-map-ac">海拔校准</div>
      <div class="k-map-acList">
        <div class="k-ac" :class="options.ac ===0?'active':'' " @click="setAc(0)">0Km</div>
        <div class="k-ac" :class="options.ac ===2?'active':'' " @click="setAc(2)">2Km</div>
        <div class="k-ac" :class="options.ac ===7?'active':'' " @click="setAc(7)">7Km</div>
      </div>
      <div class="k-map-btn" @click="search">搜索</div>
    </div>
  </div>
</template>
<script>
  import {} from '../../static/core/baidu.js'
  import tool from '../tools/tools'
  export default{
    data () {
      return {
        map: {},
        options: {
          lat: '',
          lon: '',
          ac: 0,
          lang: 'zh-CN',
          unit: 'metric',
          output: 'internal',
          tzshift: 0
        },
        address: ''
      }
    },
    mounted () {
      let that = this
      this.map = new window.BMap.Map('k-baidu-Map')
      this.map.centerAndZoom(new window.BMap.Point(104.072366, 30.662304), 12)
      this.map.addEventListener('tilesloaded', function () {
        that.getCenter()
      })
    },
    methods: {
      getCenter () {
        let point = this.map.getCenter()
        this.options.lat = point.lat
        this.options.lon = point.lng
        this.getTimer()
      },
      search () {
        let that = this
        let local = new window.BMap.LocalSearch(that.map, {
          renderOptions: {map: that.map}
        })
        local.search(that.address)
        this.getTimer()
      },
      setAc (ac) {
        this.options.ac = ac
        this.getTimer()
      },
      getTimer () {
        this.$emit('eventHandle', tool.parseData(this.options))
      }
    },
    beforeDestroy () {
      this.map.removeEventListener('tilesloaded')
    }
  }
</script>
