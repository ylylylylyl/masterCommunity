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

import '../static/css/app.css'

import './theme/common.css'
import VueResource from 'vue-resource'
import VueJsonp from 'vue-jsonp'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.prototype.mui = mui
Vue.prototype.$ajax = Ajax
Vue.use(VueJsonp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'

})
