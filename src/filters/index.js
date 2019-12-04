/* eslint-disable no-useless-escape */
import Vue from 'vue'

Vue.filter('city', city => {
  var str = city.replace(/\([^\)]*\)/g, '')
  return str
})
