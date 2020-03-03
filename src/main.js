// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/css/mui.css'
import mui from '../static/js/mui.js'
import '../static/js/mui.picker.js'
import '../static/js/mui.dtpicker.js'

import '../static/js/mui.poppicker'
import '../static/css/mui.picker.min.css'
import '../static/css/mui.poppicker.css'

import './assets/iconfont/iconfont.css'
import './assets/iconfont/iconfont.js'
import Ajax from './utils/ajax'
import './filters'
import '../static/css/app.css'

import './theme/common.css'
import AMap from 'vue-amap'


import VueResource from 'vue-resource'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(require('vue-cookies'))
Vue.use(AMap)
Vue.prototype.mui = mui
Vue.prototype.$ajax = Ajax
AMap.initAMapApiLoader({
  key: '8224cb94492d645e544a7b13df3ea7db', // 刚刚开发者申请哪里的key
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.ControlBar', 'AMap.Geolocation']
})
Vue.$cookies.config('2d')
router.beforeEach((to, from, next) => {
  /* 判断该路由是否需要登录权限 */
  if (to.matched.some(record => record.meta.requireAuth)) {
    // 是否登录
    if (!Vue.$cookies.get('CUR_USERINFO')) {
      router.push('/login')
    }
  }
  if (to.matched.some(record => record.meta.requireBind)) {
    // 是否绑定房屋
    if (!Vue.$cookies.get('CUR_BINDINFO')) {
      mui.alert('请先绑定房屋！', '', function () {})
      next({
        path: '/bindhouse',
        query: { redirect: to.fullPath }// 添加当前路由信息
      })
    }
  }
  next();
})
window.urlsPath = {
  statisticsUrl: 'https://m.amap.com/around/?locations=116.470098,39.992838&keywords=%E7%BE%8E%E9%A3%9F,KTV,%E5%9C%B0%E9%93%81%E7%AB%99,%E5%85%AC%E4%BA%A4%E7%AB%99&defaultIndex=3&defaultView=&searchRadius=5000&key=9342d0c3e0b2ebe14922871bb6f3189f'
}
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'

})
