import getToken, { setToken } from 'utils/auth'
import * as mutationTypes from '../mutation-types'
import { login } from 'api/user'

// 用户模块
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  [mutationTypes.RESET_USER_STATE]: state => {
    Object.assign(state, getDefaultState())
  },
  [mutationTypes.SET_TOKEN]: (state, token) => {
    state.token = token
  },
  [mutationTypes.SET_NAME]: (state, name) => {
    state.name = name
  },
  [mutationTypes.SET_AVATAR]: (state, avatar) => {
    state.avatar = avatar
  },
  [mutationTypes.SET_ROLES]: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // 用户登录
  login ({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password
      }).then(response => {
        const { data } = response
        commit(mutationTypes.SET_TOKEN, data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取用户信息
  getUserInfo ({ commit, state }) {
    console.log('获取用户信息')
    const roles = ['admin']
    const username = 'test'
    const avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'
    commit(mutationTypes.SET_ROLES, roles)
    commit(mutationTypes.SET_NAME, username)
    commit(mutationTypes.SET_AVATAR, avatar)
    return Promise.resolve({
      data: {
        username,
        roles,
        avatar
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
