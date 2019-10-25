import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home'
import Community from '../views/community'
import SelfCenter from '../views/selfcenter'
import Login from '../views/login'
import Regist from '../views/regist'
import Layout from '../components/layout'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/regist',
      component: Regist
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/',
          name: 'home',
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

    }
  ]
})
