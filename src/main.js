import Vue from 'vue'
import App from './App.vue'
import {router} from './router'
import store from './store'
import {adaption} from './assets/js/adaption'


Vue.config.productionTip = false

adaption(75);
const VM = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
export {VM}
