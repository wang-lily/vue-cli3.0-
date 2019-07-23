import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import product from './product'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    product
  },
  state: {
    redirect: '',
    token: localStorage.getItem('token') || '',
    num: 0
  },
  // 类似计算属性
  getters: {},
  //修改状态,同步操作
  mutations: {
    changeToken(state, token) {
      localStorage.setItem('token', token)
      state.token = localStorage.getItem('token')
    },
    changeRedirect(state, redirect) {
      state.redirect = redirect
    },
    incrementNum(state, n) {
      state.num = +n
    }
  },
  //Action 提交的是 mutation，而不是直接变更状态,Action 可以包含任意异步操作
  actions: {}
})
