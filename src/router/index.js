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
const BindHouse = () => import('../views/houseinfo/bindhouse.vue')
const OpenDoor = () => import('../views/opendoor')
const AnnounceDetail = () => import('../views/community/announceDetail.vue')
const CityChoose = () => import('../views/addpayuser/citychoose')
const SelfInfo = () => import('../views/selfinfo')
const Village = () => import('../views/village')
const Province = () => import('../views/village/province.vue')
const City = () => import('../views/village/city.vue')
const Area = () => import('../views/village/area.vue')
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [{
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
    children: [{
      path: '/',
      name: 'login',
      component: Login
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
      path: '/houseinfo/',
      name: 'houseinfo',
      component: HouseInfo
    },
    {
      path: '/houseinfodet/:bindid',
      name: 'houseinfodet',
      component: HouseInfoDetail
    },
    {
      path: '/bindhouse',
      name: 'bindhouse',
      component: BindHouse,
      meta: {
        keepAlive: true
      }

    },
    {
      path: '/opendoor',
      name: 'opendoor',
      component: OpenDoor
    },
    {
      path: '/announcedetail',
      name: 'announcedetail',
      component: AnnounceDetail
    }
    ]

  },
  {
    path: '/forum',
    name: 'forum',
    component: Forum

  },
  {
    path: '/forumdetail',
    name: 'forumdetail',
    component: ForumDetail

  },
  {
    path: '/publishforum',
    name: 'publishforum',
    component: PublishForum
  },
  {
    path: '/citychoose',
    name: 'cityChoose',
    component: CityChoose
  },
  {
    path: '/liferepair',
    name: 'liferepair',
    component: LifeRepair
  },
  {
    path: '/selfinfo',
    name: 'selfinfo',
    component: SelfInfo
  },
  {
    path: '/village',
    name: 'village',
    component: Village,
    children: [
      {
        path: '/',
        name: 'province',
        component: Province
      },
      {
        path: '/village/province',
        name: 'province',
        component: Province
      },
      {
        path: '/village/city',
        name: 'city',
        component: City
      },
      {
        path: '/village/area',
        name: 'area',
        component: Area
      }
    ]
  }
  ]
})
