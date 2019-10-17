// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/iconfont/iconfont.css'
import './assets/iconfont/iconfont.js'
import '../static/css/mui.css'
import mui from './assets/js/mui'

import './theme/common.css'
Vue.config.productionTip = false
Vue.prototype.mui = mui
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})