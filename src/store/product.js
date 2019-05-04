const product = {
  namespaced: true,
  state: {
    count: 1,
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
    increment(state, n) {
      state.count += n;
    },
    decrement(state) {
      state.count--;
    },
    decrementBy(state, n) {
      state.count -= n;
    },
    incrementBy(state, payload) {
      state.count += payload.amount;
    }
  },
  //Action 提交的是 mutation，而不是直接变更状态,Action 可以包含任意异步操作
  actions: {
    actionsA({ commit, rootCommit }) {
      //rootCommit根节点的commit
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit("decrement");
          rootCommit("incrementNum", 10);
          resolve();
        }, 1000);
      });
    },
    async actionsB({ commit, dispatch }, n) {
      await dispatch("actionsA");
      commit("decrementBy", n);
    }
  }
};
export default product