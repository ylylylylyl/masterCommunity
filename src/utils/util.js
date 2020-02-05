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

export function toTimestamp (time) {
  if (time == '' || !time) {
    return null
  }
  let timesTamp = Number(time)
  return timesTamp
}

//获取cookie、
export function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}

//设置cookie,增加到vue实例方便全局调用
export function setCookie (c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};

//删除cookie
export function delCookie (name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
   document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};