<template>
  <div class></div>
</template>
<script>
import {mapState,mapGetters,mapMutations} from 'vuex'
export default {
  name: "",

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      localCount:1
    }
  },

  computed: {
    localComputed(){},
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState({
      // 箭头函数可使代码更简练
      count: state => state.count,

      // 传字符串参数 'count' 等同于 `state => state.count`
      countAlias: 'count',

      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      countPlusLocalState (state) {
        return state.count + this.localCount
    }
    }),
    ...mapState([
      'token'
    ]),
    ...mapGetters({
      doneCount:'doneTodosCount',
    }),
    ...mapGetters([
      'doneTodos'
    ])
  },
  watch: {},
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next();
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    next();
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    next();
  },
  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    ...mapMutations([
       // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
};
</script>
<style lang="scss" scoped>
</style>
