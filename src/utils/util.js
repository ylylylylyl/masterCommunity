import Ajax from '../utils/ajax'

export function goback () {
  this.$router.go(-1)
}
export function MP (ak) {
  return new Promise(function (resolve, reject) {
    window.onload = function () {
      resolve(BMap)
    }
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'http://api.map.baidu.com/api?v=2.0&ak=' + ak + '&callback=init'
    script.onerror = reject
    document.head.appendChild(script)
  })
}

export function searchFromCity (value) {
  return Ajax.get({
    url: 'https:/restapi.amap.com/v3/config/district',
    params: {
      key: '8224cb94492d645e544a7b13df3ea7db',
      keywords: value
    }
  })
}
