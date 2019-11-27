import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home'
import Community from '../views/community'
import SelfCenter from '../views/selfcenter'
import Login from '../views/login'
import Regist from '../views/regist'
import Layout from '../components/layout'
import LivingPayment from '../views/livingpayment'
import PaymentRecords from '../views/paymentrecords'
import AddPayUser from '../views/addpayuser'
import PropertyPayment from '../views/propertypayment'
import RepairReport from '../views/repairreport'
import ReportRecords from '../views/repairreport/reportrecords.vue'
const LifeRepair = () => import('../views/liferepair')
const Forum = () => import('../views/forum')
const ForumDetail = () => import('../views/forum/forumdetail.vue')
const PublishForum = () => import('../views/forum/publish')
const HouseInfo = () => import('../views/houseinfo')
const HouseInfoDetail = () => import('../views/houseinfo/infodetail.vue')
const BindHouse = ()=> import('../views/houseinfo/bindhouse.vue')
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
        },
        {
          path: '/livingpayment',
          name: 'livingpayment',
          component: LivingPayment
        },
        {
          path: '/paymentrecords',
          name: 'paymentrecords',
          component: PaymentRecords
        },
        {
          path: '/addpayuser',
          name: 'addpayuser',
          component: AddPayUser
        },
        {
          path: '/propertypayment',
          name: 'propertypayment',
          component: PropertyPayment
        },
        {
          path: '/liferepair',
          name: 'liferepair',
          component: LifeRepair
        },
        {
          path: '/repairreport',
          name: 'repairReport',
          component: RepairReport
        },
        {
          path: '/reportrecords',
          name: 'reportrecords',
          component: ReportRecords
        },
        {
          path: '/houseinfo',
          name: 'houseinfo',
          component: HouseInfo
        },
        {
          path: '/houseinfodet',
          name:'houseinfodet',
          component:HouseInfoDetail
        },
        {
          path:'/bindhouse',
          name:'bindhouse',
          component:BindHouse

        }
       
      ]

    },
    {
      path: '/forum',
      name: 'forum',
      component: Forum

    },
    {
      path:'/forumdetail',
      name: 'forumdetail',
      component:ForumDetail

    },
    {
      path:'/publishforum',
      name:'publishforum',
      component:PublishForum
    }
  ]
})
