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
const BankCard = () => import('../views/bankcard')
const AddCard = () => import('../views/bankcard/addcard.vue')
const Wallet = () => import('../views/wallet')
const Recharge = () => import('../views/wallet/recharge.vue')
const Deposit = () => import('../views/wallet/deposit.vue')
const LivingPay = () => import('../views/livingpayment/livingpay.vue')
const ChangeAvatar = () => import('../views/selfinfo/changeAvatar.vue')
const MyForum = () => import('../views/forum/myforum')
const AdminLogin = () => import('../views/admin/login/login.vue')
const AdminRegist = () => import('../views/admin/regist')
const AdminVillage = () => import('../views/admin/village')
const AdminProvince = () => import('../views/admin/village/province.vue')
const AdminCity = () => import('../views/admin/village/city.vue')
const AdminArea = () => import('../views/admin/village/area.vue')
const AdminHome = () => import('../views/admin/home/index.vue')
const AdminCommunity =  () => import('../views/admin/community/index.vue')
const AdminSelfCenter = () => import('../views/admin/selfcenter/index.vue')
const AdminAnounce = () => import('../views/admin/announcement')
const AdminAnounceList = () => import('../views/admin/announcement/announcelist.vue')
const AdminRepair = () => import('../views/admin/repairreport')
const AdminRecords = () => import('../views/admin/repairreport/reportrecords.vue')
const AdminLost = () => import('../views/admin/lost')
const AdminLostRecords = () => import('../views/admin/lost/list.vue')
const AdminLostDetail = () => import('../components/Community/lostdeail.vue')
const AdminUserMana = () => import('../views/admin/usermanage')
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
      children: [{
        path: '/',
        name: 'login',
        component: Login
      },
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/community',
        name: 'community',
        component: Community,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/selfcenter',
        name: 'selfcenter',
        component: SelfCenter,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/addpayuser',
        name: 'addpayuser',
        component: AddPayUser,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/propertypayment',
        name: 'propertypayment',
        component: PropertyPayment,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/repairreport',
        name: 'repairReport',
        component: RepairReport,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/reportrecords',
        name: 'reportrecords',
        component: ReportRecords,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/houseinfo/',
        name: 'houseinfo',
        component: HouseInfo,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/houseinfodet/:bindid',
        name: 'houseinfodet',
        component: HouseInfoDetail,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/bindhouse',
        name: 'bindhouse',
        component: BindHouse,
        meta: {
          keepAlive: true,
          requireAuth: true
        }

      },
      {
        path: '/opendoor',
        name: 'opendoor',
        component: OpenDoor,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/announcedetail',
        name: 'announcedetail',
        component: AnnounceDetail,
        meta: {
          requireAuth: true
        }
      }
      ]

    },
    {
      path: '/forum',
      name: 'forum',
      component: Forum,
      meta: {
        requireAuth: true
      }

    },
    {
      path: '/forumdetail',
      name: 'forumdetail',
      component: ForumDetail,
      meta: {
        requireAuth: true
      }

    },
    {
      path: '/publishforum',
      name: 'publishforum',
      component: PublishForum,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/citychoose',
      name: 'cityChoose',
      component: CityChoose,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/liferepair',
      name: 'liferepair',
      component: LifeRepair,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/selfinfo',
      name: 'selfinfo',
      component: SelfInfo,
      meta: {
        requireAuth: true
      }
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
    },
    {
      path: '/bankcard',
      name: 'bankcard',
      component: BankCard,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/addcard',
      name: 'addcard',
      component: AddCard,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: Wallet,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: Recharge,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/deposit',
      name: 'deposit',
      component: Deposit,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/livingpay',
      name: 'livingpay',
      component: LivingPay,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/paymentrecords',
      name: 'paymentrecords',
      component: PaymentRecords,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/livingpayment',
      name: 'livingpayment',
      component: LivingPayment,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/changeAvatar',
      name: 'changeAvatar',
      component: ChangeAvatar,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/myforum',
      name: 'myforum',
      component: MyForum,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/adminlogin',
      name: 'adminlogin',
      component: AdminLogin
    },
    {
      path: '/adminregist',
      name: 'adminregist',
      component: AdminRegist,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/adminvillage',
      name: 'adminvillage',
      component: AdminVillage,
      children: [
        {
          path: '/',
          name: 'province',
          component: AdminProvince
        },
        {
          path: '/adminvillage/province',
          name: 'province',
          component: AdminProvince
        },
        {
          path: '/adminvillage/city',
          name: 'city',
          component: AdminCity
        },
        {
          path: '/adminvillage/area',
          name: 'area',
          component: AdminArea
        }
      ]
    },
    {
      path: '/admin',
      component: Layout,
      children: [
        {
          path: '/',
          name: 'home',
          component: AdminHome,
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'home',
          name: 'home',
          component: AdminHome,
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'community',
          name: 'community',
          component: AdminCommunity,
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'selfcenter',
          name: 'selfcenter',
          component: AdminSelfCenter,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/announce',
      name: 'announce',
      component: AdminAnounce
    },
    {
      path: '/adminannounce',
      name: 'adminannounce',
      component: AdminAnounceList
    },
    {
      path: '/adminrepair',
      name: 'adminrepair',
      component: AdminRepair
    },
    {
      path: '/adminrecords',
      name: 'adminrecords',
      component: AdminRecords
    },
    {
      path: '/adminlost',
      name: 'adminlost',
      component: AdminLost
    },
    {
      path: '/lostlist',
      name: 'lostlist',
      component: AdminLostRecords
    },
    {
      path: '/lostdetail',
      name: 'lostdetail',
      component: AdminLostDetail
    },
    {
      path: '/adminuserman',
      name: 'adminuserman',
      component: AdminUserMana
    }
  ]
})
