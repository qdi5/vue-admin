import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Select, MessageBox, Message, Loading, Notification } from 'element-ui'
Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Select)
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
