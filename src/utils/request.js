import axios from 'axios'
// import Vue from 'vue'
import store from '../store'
import getToken from 'utils/auth'
// import { MessageBox, Message } from 'element-ui'

const BASE_URL = process.env.VUE_APP_REQUEST_PREFIX
const request = axios.create({
  baseURL: BASE_URL,
  timeout: 5000
})
// 请求拦截器
request.interceptors.request.use(config => {
  // token存在，则在请求头中加上token
  if (store.getters.token) {
    config.headers['X-Token'] = getToken()
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 返回拦截器
request.interceptors.response.use(response => {
  const res = response.data
  /* Message({
    message: res.message || 'Error',
    type: 'error',
    duration: 5 * 1000
  }) */
  return res
})

export { request }
export default {
  install: (Vue, options) => {
    Vue.prototype.$http = request
  }
}
