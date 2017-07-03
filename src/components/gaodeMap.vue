<template>
  <map-control :searchEvt='searchEvt'>
    <div style='text-align: right;font-size: 12px ;color: #9c9c9c; margin: 10px'>点击上方按钮，获取当前定位 ▲</div>
    <input slot='address' class='k-map-input' type='text' placeholder='输入地名搜索' v-model='address'>
  </map-control>
</template>
<script>
  import {} from '../../static/core/gaode.js'
  import mapControl from './mapcontrol.vue'
  // import tool from '../tools/tools'

  export default{
    data () {
      return {
        map: {},
        address: ''
      }
    },
    components: {
      mapControl
    },
    mounted () {
      let that = this
      that.map = new window.AMap.Map('k-Map', {
        resizeEnable: true,
        zoom: 12
      })
      that.map.setFeatures(['bg', 'road', 'building'])
      that.map.on('moveend', function () {
        that.getCenter()
      })
      that.getCurrentLocation()
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
      searchEvt () {
        let that = this
        window.AMap.service(['AMap.PlaceSearch'], function () {
          let placeSearch = new window.AMap.PlaceSearch({ // 构造地点查询类
            pageSize: 1,
            pageIndex: 1,
            city: '010', // 城市
            map: that.map
          })
          // 关键字查询
          placeSearch.search(that.address)
        })
      },
      getCurrentLocation () {
        let that = this
        that.map.plugin('AMap.Geolocation', function () {
          let geolocation = new window.AMap.Geolocation({
            enableHighAccuracy: true, // 是否使用高精度定位，默认:true
            timeout: 10000,           // 超过10秒后停止定位，默认：无穷大
            maximumAge: 0,            // 定位结果缓存0毫秒，默认：0
            convert: true,            // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true,         // 显示定位按钮，默认：true
            buttonPosition: 'RB',     // 定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new window.AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: false,        // 定位成功后在定位到的位置显示点标记，默认：true
            showCircle: false,        // 定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,     // 定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true     // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          })
          that.map.addControl(geolocation)
          window.AMap.event.addListener(geolocation, 'complete', onComplete) // 返回定位信息
          window.AMap.event.addListener(geolocation, 'error', onError)      // 返回定位出错信息
        })
        function onComplete (data) {
          let str = ['定位成功']
          str.push('经度：' + data.position.getLng())
          str.push('纬度：' + data.position.getLat())
        }

        // 解析定位错误信息
        function onError (data) {
          window.alert('定位失败')
        }
      }
    }
  }
</script>
