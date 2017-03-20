import $ from 'jquery'
export default {
  // ios only https can use and baidu own api is also no longer to use
  getCurrentPosition: function (callback) {
    if (window.navigator.geolocation) {
      let options = {
        enableHighAccuracy: true,
        maximumAge: 1000
      }
      window.navigator.geolocation.getCurrentPosition(function (position) {
        callback({longitude: position.coords.longitude, latitude: position.coords.latitude})
      }, onError, options)
    } else {
      window.alert('当前设备不支持获取地理信息')
    }
  },
  parseData: function (param, key) {
    let that = this
    var paramStr = ''
    if (param.constructor === String || param.constructor === Number || param.constructor === Boolean) {
      paramStr += '&' + key + '=' + encodeURIComponent(param)
    } else {
      $.each(param, function (i) {
        var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
        paramStr += '&' + that.parseData(this, k)
      })
    }
    return paramStr.substr(1)
  }
}
function onError (error) {
  switch (error.code) {
    case 1:
      window.alert('位置服务被拒绝')
      break

    case 2:
      window.alert('暂时获取不到位置信息')
      break

    case 3:
      window.alert('获取信息超时')
      break

    case 4:
      window.alert('未知错误')
      break
  }
}
