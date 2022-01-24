import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
Vue.use(window.antd)
import QuickModal from '../packages'
Vue.prototype.quickDrawerShow = QuickModal
new Vue({
  render: h => h(App)
}).$mount('#app')
