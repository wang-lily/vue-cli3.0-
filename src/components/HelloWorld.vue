<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li :class="active?'arrow-bottom-active':'arrow-bottom'"><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a><i class="arrow" @click="active=!active"></i></li>
      <li :class="active?'arrow-right-active':'arrow-right'"><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslgfint</a><i class="arrow" @click="active=!active"></i></li>
      <li  :class="active?'arrow-left-active':'arrow-left'" ><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a><i class="arrow" @click="active=!active"></i></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-mocha" target="_blank" rel="noopener">unit-mocha</a></li>
      <li  :class="active?'arrow-top-active':'arrow-top'"><a href="javascript:;" target="_blank" rel="noopener">test</a><i class="arrow" @click="active=!active"></i></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-e2e-cypress" target="_blank" rel="noopener">e2e-cypress</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
    <DoubleRecord :doubleRec="doubleRec"/>
    <i class="triangle"></i>
  </div>
</template>

<script>
import DoubleRecord from '@/components/DoubleRecord'
export default {
  name: 'HelloWorld',
  components:{
    DoubleRecord
  },
  props: {
    msg: String
  },
  data(){
    return{
      active:false,
      doubleRec: {
        show: true,
        complete: false
      },
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello{
  width: 100%;
  .triangle{
    @include triangle(bottom);
  }
  .arrow{
  @include pointer;
}
h3 {
  margin: 40px 0 0;
}
ul {
  @include flex-center-center;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  &.arrow-top{
    @include arrow-top(6px,20px,2px,#666,-45deg);
  }
  &.arrow-top-active{
    @include arrow-top(6px,20px,2px,#666,135deg);
  }
  &.arrow-left{
    @include arrow-left(6px,20px,2px,#666,-135deg);
  }
  &.arrow-left-active{
    @include arrow-left(6px,20px,2px,#666,45deg);
  }
  &.arrow-right{
    @include arrow-right(6px,20px,2px,#666,45deg);
  }
  &.arrow-right-active{
    @include arrow-right(6px,20px,2px,#666,225deg);
  }
  &.arrow-bottom{
    @include arrow-bottom(6px,20px,2px,#666,135deg);
  }
  &.arrow-bottom-active{
    @include arrow-bottom(6px,20px,2px,#666,315deg);
  }
  border:1px solid #000;
  padding:20px;
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
}
</style>
