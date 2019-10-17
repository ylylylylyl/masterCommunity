import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home'
import Community from '../views/community'
import SelfCenter from '../views/selfcenter'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/community',
      name: 'community',
      component: Community
    },
    {
      path: '/selfcenter',
      name: 'selfcenter',
      component: SelfCenter
    }
  ]
})
