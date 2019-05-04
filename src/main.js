import Vue from 'vue'
import App from './App.vue'
import {router} from '@/router/index'
import store from '@/store/index'
import {adaption} from './assets/js/adaption'
import createDirective from "@/directive"
import MetaInfo from "vue-meta-info";


Vue.use(MetaInfo);
Vue.config.productionTip = false

adaption(37.5);
createDirective();
const VM = new Vue({
  router,
  store,
  render: h => h(App),
  // 预渲染
  mounted () {
  document.dispatchEvent(new Event("render-event"));
}
}).$mount('#app')

export default VM
