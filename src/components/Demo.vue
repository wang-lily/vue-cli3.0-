<template>
  <div class>
    <!-- <span>{{todos_0_text}}test</span> -->
    <!-- <span>{{count}}总数</span> -->
    {{ userInfo.name }}
    <input v-model="userInfo.phone" />
    <el-button @click="postSomething">确定</el-button>
    <span>{{ seconds }}秒</span>
    <el-button @click="timerPause = true">暂停</el-button>

    <el-button @click="tab.current = 1">tab1</el-button>
    <el-button @click="tab.current = 2">tab2</el-button>
    <keep-alive>
      <component :is="currentTab"></component>
    </keep-alive>
    <demo-slot>
      <template #default="{defalut:my}">
        <div>{{ my.text }}</div>
      </template>
      <template #slotA="{aaa,bbb,getaaa}">
        <div>
          {{ aaa.text }}
          {{ bbb.text }}
          {{ getaaa() }}
        </div>
      </template>
      <template #slotB="{bbb}">
        <div>
          {{ bbb.text }}
        </div>
      </template>
    </demo-slot>
    <render :level="1">
      <template #default>
        hahdfhdjfhdjfhdj
      </template>
    </render>
  </div>
</template>
<script>
import { __get_status } from '@/api/user/index'
import { isValidPhone } from '@/assets/js/common'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { clearInterval } from 'timers'
import { userInfo } from 'os'
// import DemoSlot from './DemoSlot';
import Loading from './Loading'
import Render from './Render'

export default {
  name: 'demo',

  mixins: [],

  components: {
    'demo-slot': () => import('./DemoSlot'),
    [Loading.name]: Loading,
    [Render.name]: Render
  },

  props: {},

  data() {
    return {
      tab: {
        current: 1,
        map: {
          '1': 'demo-slot',
          '2': Loading.name
        }
      },
      localCount: 1,
      userInfo: {
        name: '',
        phone: ''
      },
      seconds: 0,
      timer: null,
      timerPause: false
    }
  },

  computed: {
    currentTab() {
      let result = this.tab.map[this.tab.current]
      return result
    },
    localComputed() {},

    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState({
      // 箭头函数可使代码更简练
      count: state => state.product.count,

      // 传字符串参数 'count' 等同于 `state => state.count`
      // countAlias: 'count',

      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      countPlusLocalState(state) {
        return state.product.count + this.localCount
      }
    }),
    ...mapState(['token']),
    ...mapState('product', ['count', 'todos']),
    ...mapGetters('product', {
      doneCount: 'doneTodosCount'
    }),
    ...mapGetters('product', ['doneTodos'])
  },
  watch: {},
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next()
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    next()
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    next()
  },
  created() {
    console.log(this.userInfo)
  },

  mounted() {
    this.timer = window.setInterval(() => {
      if (this.seconds === 60 || this.timerPause) {
        window.clearInterval(this.timer)
        return
      }
      this.add(1)
      this.seconds++
    }, 1000)

    window.setTimeout(() => {
      this.userInfo.name = '猪猪'
      this.changeTodos('todo改变')
      window.setTimeout(() => {
        console.log(this.count)
      }, 1000)
    }, 8000)
  },

  beforeDestroy() {
    this.timer && window.clearInterval(this.timer)
  },

  destroyed() {},

  //局部定义过滤器
  filters: {
    capitalize: function(value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },

  methods: {
    async postSomething() {
      if (!isValidPhone(this.userInfo.phone)) {
        alert('手机号码错误！')
        return
      }
      await __get_status(this.userInfo).catch(err => {
        alert(err.message)
      })
    },
    ...mapMutations('product', [
      // `mapMutations` 也支持载荷：
      'incrementBy', // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
      'changeTodos'
    ]),
    ...mapMutations('product', {
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    }),
    ...mapActions('product', [
      'actionsA', // 将 `this.actionsA()` 映射为 `this.$store.dispatchy('actionsA')`
      'actionsB' // 将 `this.actionsB()` 映射为 `this.$store.dispatch('actionsA',n)`
    ])
  }
}
</script>
<style lang="scss" scoped></style>
