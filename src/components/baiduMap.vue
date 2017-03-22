<template>
  <map-control :searchEvt='search'>
    <input slot='address' class='k-map-input' type='text' placeholder='输入地名搜索' v-model='address'>
    <div slot='getLocation' class='k-map-btn' @click.stop.self='getCurrentLocation'>当前位置</div>
  </map-control>
</template>
<script>
  import {} from '../../static/core/baidu.js'
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
      let style = [
        {
          'featureType': 'road',
          'elementType': 'all',
          'stylers': {
            'lightness': 20
          }
        },
        {
          'featureType': 'highway',
          'elementType': 'geometry',
          'stylers': {
            'color': '#f49935'
          }
        },
        {
          'featureType': 'railway',
          'elementType': 'all',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'local',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'water',
          'elementType': 'all',
          'stylers': {
            'color': '#d1e5ff'
          }
        },
        {
          'featureType': 'poi',
          'elementType': 'labels',
          'stylers': {
            'visibility': 'off'
          }
        }
      ]
      that.map = new window.BMap.Map('k-Map', {enableMapClick: false})
      that.map.setMapStyle({
        styleJson: [style]
      })
      that.map.centerAndZoom(new window.BMap.Point(104.072366, 30.662304), 12)
      that.map.addEventListener('tilesloaded', function () {
        that.getCenter()
      })
      this.getCurrentLocation()
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
