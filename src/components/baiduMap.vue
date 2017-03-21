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
      <div class="k-map-btn" @click="getCurrentLocation">当前位置</div>
    </div>
  </div>
</template>
<script>
  import {} from '../../static/core/baidu.js'
  import {mapGetters} from 'vuex'
  // import tool from '../tools/tools'

  export default{
    data () {
      return {
        map: {},
        address: ''
      }
    },
    computed: {
      ...mapGetters({Timer7: 'Timer7'}),
      options () {
        return this.Timer7.options
      }
    },
    mounted () {
      let that = this
      that.map = new window.BMap.Map('k-baidu-Map', {enableMapClick: false})
      that.map.centerAndZoom(new window.BMap.Point(104.072366, 30.662304), 12)
      that.map.addEventListener('tilesloaded', function () {
        that.getCenter()
      })
    },
    methods: {
      getCenter () {
        let point = this.map.getCenter()
        this.$store.dispatch('timer7Update', {
          options: {
            lat: point.lat,
            lon: point.lng
          }
        })
      },
      search () {
        let that = this
        let local = new window.BMap.LocalSearch(that.map, {
          renderOptions: {map: that.map}
        })
        local.search(that.address)
      },
      setAc (ac) {
        this.$store.dispatch('timer7Update', {
          options: {
            ac: ac
          }
        })
      },
      getCurrentLocation () {
        let that = this
        let geolocation = new window.BMap.Geolocation()
        geolocation.getCurrentPosition(function (r) {
          if (this.getStatus() === 0) {
            that.map.panTo(r.point)
          } else {
            window.alert('failed' + this.getStatus())
          }
        }, {enableHighAccuracy: false})
      }
    },
    beforeDestroy () {
      this.map.removeEventListener('tilesloaded')
    }
  }
</script>
