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
import VueResource from 'vue-resource'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(require('vue-cookies'))
Vue.prototype.mui = mui
Vue.prototype.$ajax = Ajax
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
      mui.alert('请先绑定房屋！', '',function() {});
      next({
        path: '/bindhouse',
        query: { redirect: to.fullPath }//添加当前路由信息
      })
    }
  }
  next();
})

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'

})
