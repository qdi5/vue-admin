import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import modules from './modules/user'
Vue.use(Vuex)
const m = {
  user: modules
}
export default new Vuex.Store({
  getters,
  modules: m
})
