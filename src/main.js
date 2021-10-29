import Vue from 'vue'
import App from './App.vue'
import './permission'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import router from '@/router'
import BtButton from '@/components/Button'
import components from '@/components/common'
import './icons' // icon
import store from './store'
Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV === 'development'
Vue.use(ElementUI)
Vue.use(components)
Vue.component('BtButton', BtButton)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
