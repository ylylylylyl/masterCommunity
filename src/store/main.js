import {MP} from '../utils/util'
import axios from 'axios'
const CHOOSE_CITY = 'CHOOSE_CITY'
const VILLAGE = 'VILLAGE'
const CUR_PROVINCE = 'CUR_PROVINCE' // 当前省份
const CUR_CITY = 'CUR_CITY' // 当前城市
const CHOOSE_VILLAGE = 'CHOOSE_VILLAGE'// 所选择的小区
const CUR_USERINFO = 'CUR_USERINFO'
const CENTER = 'CENTER'
const FRIENDS = 'FRIENDS'
const Main = {
  state: {
    chooseCity: '',
    village: '',
    curProvince: '',
    curCity: '',
    chooseVillage: null,
    curUserInfo: {} , // 当前用户信息
    center:[106.5032550000,29.5927180000],
    // center: [106.53063501, 29.54460611],
    // center: '',
    friends: []
  },
  getters: {
    chooseCity: state => state.chooseCity,
    village: state => state.village,
    curProvince: state => state.curProvince,
    curCity: state => state.city,
    chooseVillage: state => state.chooseVillage,
    curUserInfo: state => state.curUserInfo,
    center: state => state.center,
    friends: state => state.friends
  },
  mutations: {
    [CHOOSE_CITY] (state, str) {
      state.chooseCity = str
    },
    [VILLAGE] (state, str) {
      state.village = str
    },
    [CUR_CITY] (state, str) {
      state.curCity = str
    },
    [CUR_PROVINCE] (state, str) {
      state.curProvince = str
    },
    [CHOOSE_VILLAGE] (state, str) {
      state.chooseVillage = str
    },
    [CUR_USERINFO] (state, obj) {
      state.curUserInfo = obj
    },
    [CENTER] (state, obj) {
      state.center = obj
    },
    [FRIENDS] (state,obj) {
      state.friends = obj
    }
  },
  actions: {
    setCurCity ({
      commit
    }) {
      MP('B96xQKulGmzWLRsLRQVHqD4G7EPaF1tD').then(BMap => {
        console.log("-------------------------------------------------------")
        // 百度地图API功能
        var geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition(function (position) {
          let center = []
          center.push(position.point.lng,position.point.lat)
          console.log(position.point.lng,position.point.lat)
          let city = position.address.city // 获取城市信息
          let province = position.address.province
          commit(CHOOSE_CITY, city)
          commit(CUR_CITY, city)
          commit(CUR_PROVINCE, province)
          commit(CENTER, center)
          localStorage.setItem('center', center)
          console.log(localStorage.getItem('center'))
        }, e => {
          commit(CHOOSE_CITY, '定位失败')
        }, {
          provider: 'baidu'
        })
      })
    },
    setVillage ({
      commit
    }) {
      return axios
        .get(
          'https://restapi.amap.com/v3/config/district?key=8224cb94492d645e544a7b13df3ea7db'
        )
        .then(
          result => {
            if (result.statusText == 'OK') {
              const data = result.data.districts[0].districts
              commit(VILLAGE, data)
            }
          },
          error => {
            console.log(error)
          }
        )
        .catch(err => {
          console.log(err)
        })
    },
    getFriends ({commit}) {
      let url = ''
      if (window.Vue.$cookies.get('CUR_USERINFO').adminid) {
        url = 'chat/selectAdminFriends'
      } else {
        url = 'chat/selectFriends'
      }
      return window.Vue.$ajax.post({
        url: process.env.API_HOST + url,
        data: {
          userphone: window.Vue.$cookies.get('CUR_USERINFO').userphone || window.Vue.$cookies.get('CUR_USERINFO').phone
        }
      }).then(result => {
        if (result.status) {
          commit(FRIENDS, result.result)
        } else {
  
        }
      })
    }
  }
}
export default Main