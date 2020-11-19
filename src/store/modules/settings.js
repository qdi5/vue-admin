import defaultSettings from '@/settings'
import * as mutationsType from '../mutation-types.js'
const { fixedHeader, sidebarLogo } = defaultSettings

const state = {
  fixedHeader,
  sidebarLogo
}

const mutations = {
  [mutationsType.CHANGE_SETTING]: (state, { key, value }) => {
    /* eslint-disable no-prototype-builtins */
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting ({ commit }, data) {
    commit(mutationsType.CHANGE_SETTING, data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
