import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import apis from './api'
import '@/assets/css/base.scss'
import '@/assets/iconfont/iconfont.css'

import './directive'

Vue.config.productionTip = false

Vue.prototype.$apis = apis // 统一api出口

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
