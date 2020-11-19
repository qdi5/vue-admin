import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import batVueUse from 'utils'
import request from 'utils/request'
import 'normalize.css'
import { Button, Select, Form, FormItem, Input } from 'element-ui'

batVueUse(Vue, [request, Button, Select, Form, FormItem, Input])
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
