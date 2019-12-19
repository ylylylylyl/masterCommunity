import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import {
  MP
} from '../utils/util'

Vue.use(Vuex)

const CHOOSE_CITY = 'CHOOSE_CITY'
const VILLAGE = 'VILLAGE'
const CUR_PROVINCE = 'CUR_PROVINCE' // 当前省份
const CUR_CITY = 'CUR_CITY' // 当前城市
const CHOOSE_VILLAGE = 'CHOOSE_VILLAGE'// 所选择的小区
const CUR_USERINFO = 'CUR_USERINFO'

const state = {
  chooseCity: '',
  village: '',
  curProvince: '',
  curCity: '',
  chooseVillage: '请选择小区',
  curUserInfo: {} // 当前用户信息
}

const getters = {
  chooseCity: state => state.chooseCity,
  village: state => state.village,
  curProvince: state => state.curProvince,
  curCity: state => state.city,
  chooseVillage: state => state.chooseVillage,
  curUserInfo: state => state.curUserInfo
}

const mutations = {
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
    console.log(state.curUserInfo)
  }
}

const actions = {
  setCurCity ({
    commit
  }) {
    MP('B96xQKulGmzWLRsLRQVHqD4G7EPaF1tD').then(BMap => {
      // 百度地图API功能
      var geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition((position) => {
        console.log(position)
        let city = position.address.city // 获取城市信息
        let province = position.address.province
        commit(CHOOSE_CITY, city)
        commit(CUR_CITY, city)
        commit(CUR_PROVINCE, province)
        console.log(province)
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
  }
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
export default store
