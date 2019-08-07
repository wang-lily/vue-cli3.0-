import Vue from 'vue'
import App from '@/App.vue'
import { router } from '@/router/index'
import store from '@/store/index'
import { adaption } from '@/assets/js/adaption'
import createDirective from '@/directive'
import MetaInfo from 'vue-meta-info'
import lazyload from 'vue-lazyload'
import loading from '@/assets/imgs/test/ajax-loader.gif'
import ElementUI from 'element-ui'
// import "element-ui/lib/theme-chalk/index.css"
import '@/assets/scss/element-varibles.scss'
import animate from 'animate.css'
import filters from '@/filters/index'

Vue.use(MetaInfo)
Vue.use(lazyload, {
  preLoad: 1.3,
  error: loading,
  loading: loading,
  attempt: 1
})
Vue.use(ElementUI)
Vue.use(animate)

Vue.config.productionTip = false

Vue.prototype.$clg = function(param) {
  console.info(param)
}

adaption(37.5)
createDirective()
//全局filter eg:{{num|currency("$")}}
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

const VM = new Vue({
  router,
  store,
  render: h => h(App)
  //   // 预渲染
  //   mounted () {
  //   document.dispatchEvent(new Event("render-event"));
  // }
}).$mount('#app')

export default VM
