import { getToken } from 'utils/auth'

const state = {
  test: 'Vue后台管理系统',
  token: getToken()
}

const mutations = {

}

const actions = {

}

export default {
  // 带命名空间的模块；当模块被注册后，它的所有getter、action及mutation都会根据模块注册的路径调整命名
  namespaced: true,
  state,
  mutations,
  actions
}
