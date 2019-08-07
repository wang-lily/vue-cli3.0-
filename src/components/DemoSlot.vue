<template>
  <div>
    <div>
      <div class="top">
        <p>这是一段测试文字</p>
      </div>

      
    </div>
    <slot :defalut="defalut">defalut</slot>
    <slot name="slotA" :aaa="aaa" :bbb="bbb" :getaaa="getaaa"></slot>
    <slot name="slotB" :bbb="bbb"></slot>
  </div>
</template>
<script>
export default {
  name: 'demo-slot',
  data() {
    return {
      defalut: {
        text: '我是default'
      },
      aaa: {
        text: '我是aaa'
      },
      bbb: {
        text: '我是bbb'
      },
      getaaa: this.getAaa
    }
  },
  methods: {
    getAaa() {
      return '我是aaa的方法'
    }
  }
}
</script>
