import { request } from 'utils/request'

// 登录
export function login ({ username, password }) {
  return request.post('/user/login', {
    username,
    password
  })
}

// 获取用户信息
export function getUserInfo (token) {
  return request.get(`/user/info?token=${token}`)
}

// 退出登录
export function logOut () {
  return request.post('/user/logout')
}
