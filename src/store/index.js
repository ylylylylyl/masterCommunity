import Vue from 'vue'
import Vuex from 'vuex'

import {
  MP
} from '../utils/util'

Vue.use(Vuex)

const CHOOSE_CITY = 'CHOOSE_CITY'

const state = {
  chooseCity: ''
}

const getters = {
  chooseCity: state => state.chooseCity
}

const mutations = {
  [CHOOSE_CITY] (state, str) {
    state.chooseCity = str
  }
}
const actions = {
  setCurCity ({commit}) {
    MP('B96xQKulGmzWLRsLRQVHqD4G7EPaF1tD').then(BMap => {
      // 百度地图API功能
      var geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition((position) => {
        let city = position.address.city // 获取城市信息 
        commit(CHOOSE_CITY, city)
      }, e => {
        commit(CHOOSE_CITY, '定位失败')
      }, {
        provider: 'baidu'
      })
    })
    // var geolocation = new BMap.Geolocation()
    // geolocation.getCurrentPosition((position) => {
    //   let city = position.address.city // 获取城市信息 
    //   commit(CHOOSE_CITY, city)
    // }, e => {
    //   commit(CHOOSE_CITY, '定位失败')
    // }, {
    //   provider: 'baidu'
    // })
  }
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
export default store
