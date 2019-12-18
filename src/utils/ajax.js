/* eslint-disable no-unused-vars */
import axios from 'axios'
import Qs from 'qs'
import { isObject, isArray, isString } from './type'
import router from '../router'
const BASE_URL = ''

const Axios = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  responseType: 'json',
  withCredentials: false,
  formData: false,
  isDownload: false
})

let Config = null

let loading = document.querySelector('#ajaxLoading')
loading.onclick = function () {
  this.style.display = 'none'
}

function startLoading () {
  if (!loading) return
  loading.style.display = 'block'
}

function endLoading () {
  if (!loading) return
  loading.style.display = 'none'
}

// 添加请求拦截器
Axios.interceptors.request.use(config => {
  const UID = sessionStorage.getItem('WXDYFS')
  const PATH = router.currentRoute.path
  // Message.closeAll()
  // if (!isString(UID) && PATH !=='/login') {
  //     Message.error('非常抱歉，登陆已过期请重新登录！')
  //     router.push('/login')
  //     return
  // }

  let contentType = ''
  // POST请求头设置
  if (config.method.toUpperCase() === 'POST') {
    if (config.formData) {
      contentType = 'application/x-www-form-urlencoded;charset=UTF-8'
      config.data = Qs.stringify(config.data)
    } else {
      contentType = 'application/json;charset=UTF-8'
      if (isObject(config.data) || isArray(config.data)) {
        config.data = JSON.stringify(config.data)
      }
    }
  }
  // GET请求头设置
  if (config.method.toUpperCase() === 'GET') {
    contentType = 'application/json;charset=UTF-8'
  }
  if (contentType === '') {
    // Message.error('无效请求，请指明请求方式！')
  }
  config.headers['Content-Type'] = contentType
  // 文件下载延长请求时间
  if (config.isDownload === true) {
    config.timeout = 120000
  }
  Config = config
  return config
}, error => {
  console.log(error, '请求错误')
  // Message.error(error && error.data.error)
  return Promise.reject(error.data.error)
})

// 响应拦截
Axios.interceptors.response.use(response => {
  // Message.closeAll()
  const result = response.data
  const url = response.config.url
  if (!isObject(result)) {
    // Message.error('非常抱歉，没有相关响应数据！')
    return response
  }
  // if(url !== '/api/logout' && result.status === -1){
  //     if(result.reason){
  //         Message.error(result.reason+'，请重新登陆！')
  //     }else{
  //         Message.error('请重新登陆！')
  //     }
  //     localStorage.clear()
  //     router.push('/login')
  // }else{
  return response
  // }
}, error => {
  // Message.closeAll()
  console.log(error, '响应错误')
  const status = error.response
  if (!status) {
    // 拦截断网
    if ((error + '').search('Network Error') !== -1) {
      // Message.error('哎哟，网络出错咯。请检查您的网络！')
    }
    // 拦截超时
    if ((error + '').search('timeout') !== -1) {
      if (Config.isDownload === true) {
        // Message.error('哎哟，由于文件过大下载超时咯。请换种方式进行下载！')
      } else {
        // Message.error('哎哟，请求超时咯。请稍后再重试！')
      }
    }
  }
  // 拦截错误响应状态码
  if (status && status.status) {
    switch (status.status) {
      case 400:
        // Message.error('非常抱歉，"Bad Request"！')
        break
      case 401:
        // Message.error('非常抱歉，未经授权！')
        break
      case 403:
        // Message.error('非常抱歉，拒绝访问！')
        break
      case 404:
        // Message.error('非常抱歉，"Not Found"！')
        break
      case 500:
        // Message.error('非常抱歉，服务器出错了！')
        break
      case 502:
        // Message.error('非常抱歉，"Bad Gateway"！')
        break
      case 503:
        // Message.error('非常抱歉，"Service Unavailable"！')
        break
      case 504:
        // Message.error('非常抱歉，"Gateway Timeout"！')
        break
      case 505:
        // Message.error('非常抱歉，"HTTP Version Not Supported"！')
        break
      default:
            // Message.error('您遇到了一个未知错误，必要情况下请联系管理员！')
    }
  }
  return Promise.reject(error)
})
/**
 * options:{
 *  url           // 接口地址
 *  method        // 请求方式
 *  params        // url参数
 *  data          // post方式的数据
 *  formData      // 设置Content-Type，默认为false，及对应'application/json;charset=UTF-8'
 *  isShowLoading // 是否设置全局loading，默认为false
 *  isDownload    // 是否为文件下载，默认为false
 * }
 */
class Ajax {
  static post (options) {
    let isShowLoading = options.isShowLoading || false
    if (isShowLoading) startLoading()
    return new Promise((resolve, reject) => {
      Axios({
        url: options.url,
        method: 'POST',
        params: options.params || '',
        data: options.data || '',
        formData: options.formData || false,
        isDownload: options.isDownload || false
      }).then((response) => {
        if (isShowLoading) endLoading()
        if (response.status === 200) {
          resolve(response.data)
          return
        }
        reject(response)
      }).catch(err => {
        if (isShowLoading) endLoading()
        reject(err)
      })
    })
  }
  // GET请求
  static get (options) {
    let isShowLoading = options.isShowLoading || false
    if (isShowLoading) startLoading()
    return new Promise((resolve, reject) => {
      Axios({
        url: options.url,
        method: 'GET',
        params: options.params || '',
        isDownload: options.isDownload || false
      }).then(response => {
        if (isShowLoading) endLoading()
        if (response.status === 200) {
          resolve(response.data)
          return
        }
        reject(response)
      }).catch(err => {
        if (isShowLoading) endLoading()
        reject(err)
      })
    })
  }
}

export default Ajax
