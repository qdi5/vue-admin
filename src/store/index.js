import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import getters from './getters'
import user from './modules/user'
import permission from './modules/permission'
Vue.use(Vuex)

const isDebug = process.env.NODE_EVN !== 'production'

export default new Vuex.Store({
  modules: {
    user,
    permission
  },
  getters,
  plugins: isDebug ? [createLogger()] : []
})
