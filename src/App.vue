<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/my-swiper">Swiper</router-link> |
      <router-link to="/test">Test</router-link> |
      <router-link to="/carId">CarId</router-link>
    </div>
    <router-view>
      <Loading />
    </router-view>
  </div>
</template>
<script>
import Loading from '@/components/Loading'
export default {
  name: 'app',
  components: {
    Loading
  },
  created() {
    //添加页面刷新监听事件，在页面刷新时，将vuex里的信息保存到sessionStorage里,避免多次调用sessionStorage进行存储降低性能,
    window.addEventListener('beforeunload', this.saveVuexState)
    //在页面进入前读取sessionStorage状态
    this.initVuexState()
  },
  destroyed() {
    window.removeEventListener('beforeunload', this.saveVuexState)
  },
  methods: {
    //读取sessionStorage状态并存储到state
    initVuexState() {
      window.sessionStorage.getItem('vuexState') &&
        this.$store.replaceState(
          JSON.parse(window.sessionStorage.getItem('vuexState'))
        )
    },
    //将vuex里的信息保存到sessionStorage里
    saveVuexState() {
      window.sessionStorage.setItem(
        'vuexState',
        JSON.stringify(this.$store.state)
      )
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
