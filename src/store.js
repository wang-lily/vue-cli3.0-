import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1,
    redirect: "",
    token: localStorage.getItem("token") || "",
    todos: [
      { id: 1, text: "...", done: true },
      { id: 2, text: "...", done: false }
    ]
  },
  // 类似计算属性
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done);
    },
    // Getter 也可以接受其他 getter 作为第二个参数
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length;
    },
    // getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果
    getTodoById: state => id => {
      return state.todos.find(todo => todo.id === id);
    }
  },
  //修改状态,同步操作
  mutations: {
    changeToken(state,token){
      localStorage.setItem("token",token);
      state.token = localStorage.getItem("token");
    },
    changeRedirect(state, redirect) {
      state.redirect = redirect;
    },
    increment (state,n){
      state.count += n;
    },
    incrementBy (state, payload){
      state.count += payload.amount;
    },
    //Action 提交的是 mutation，而不是直接变更状态,Action 可以包含任意异步操作
    actions:{
      changeAuth(context){
        context.commit('changeToken');
      }
    }
  },
  actions: {}
});
