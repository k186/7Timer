<template>
  <map-control :searchEvt='searchEvt'>
    <input slot='address' class='k-map-input' type='text' placeholder='输入地名搜索' v-model='address'>
    <div slot='getLocation' class='k-map-btn' @click.stop.self='getCurrentLocation'>当前位置</div>
  </map-control>
</template>
<script>
  // import {} from '../../static/core/google'
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
      that.map = new window.google.maps.Map(window.document.getElementById('k-Map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 12,
        disableDefaultUI: true,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP
      })
      window.google.maps.event.addListener(that.map, 'center_changed', function () {
        that.getCenter()
      })
      that.getCurrentLocation()
    },
    methods: {
      getCenter () {
        let point = JSON.parse(JSON.stringify(this.map.getCenter()))
        this.$store.dispatch('timer7Update', {
          options: {
            lat: point.lat,
            lon: point.lng
          }
        })
      },
      searchEvt () {
        let that = this
        let geocoder = new window.google.maps.Geocoder()
        geocoder.geocode({address: that.address}, function (results, status) {
          if (status === window.google.maps.GeocoderStatus.OK) {
            that.map.setCenter(results[0].geometry.location)
          } else {
            window.alert('Geocode was not successful for the following reason: ' + status)
          }
        })
      },
      getCurrentLocation () {
        let that = this
        // let infoWindow = new window.google.maps.InfoWindow({map: that.map})
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            let pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }

            // infoWindow.setPosition(pos)
            // infoWindow.setContent('Location found.')
            that.map.setCenter(pos)
          }, function () {
            handleLocationError(true, null, that.map.getCenter())
          })
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, null, that.map.getCenter())
        }
        function handleLocationError (browserHasGeolocation, infoWindow, pos) {
          // infoWindow.setPosition(pos)
          // infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.')
          window.alert('getLocation error')
        }
      }
    }
  }
</script>
