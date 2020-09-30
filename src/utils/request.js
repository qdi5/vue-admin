import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '../store'
const request = axios.create({
  baseURL: process.env.VUE_APP_AJAX_BASE_URL,
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(config => {
  if (store.getters.token) {
    // 让每一个请求都携带token
    config.headers['X-Token'] = getToken()
  }
})
