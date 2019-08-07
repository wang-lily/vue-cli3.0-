<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" a="1" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <ToTop :showY="500" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

import ToTop from '@/components/ToTop'
export default {
  metaInfo: {
    title: 'We Inc',
    meta: [
      {
        name: 'keywords',
        content: '关键字1,关键字2,关键字3'
      },
      {
        name: 'description',
        content: '这是一段网页的描述'
      }
    ]
  },
  name: 'home',
  components: {
    ToTop,
    HelloWorld
  }
}
</script>
