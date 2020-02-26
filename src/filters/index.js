/* eslint-disable no-useless-escape */
import Vue from 'vue'

Vue.filter('city', city => {
  var str = city.replace(/\([^\)]*\)/g, '')
  return str
})

Vue.filter('format', timestamp => {
  var date = new Date(timestamp) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()) + ' '
  var h = (date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()) + ':'
  var m = (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : (date.getMinutes())) + ':'
  var s = (date.getSeconds() < 10 ? ('0' + date.getSeconds()) : (date.getSeconds()))
  return Y + M + D + h + m + s
})

Vue.filter('status', item => {
  switch (item) {
    case '0':
      return '未处理'
    case '1':
      return '已处理'
  }
})
Vue.filter('losttype', type => {
  switch (type) {
    case 0:
      return '待领取'
    case 1:
      return '已领取'
  }
})
// Vue.filter('initIcon', type => {
//   switch (type) {
//     case 1:
//       return '#icon-ranqifei'
//     case 2:
//       return '#icon-dianfei'
//     case 3:
//       return '#icon-shuifei'
//   }
// })