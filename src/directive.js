import Vue from 'vue'
export default function createDirective() {
  //自定义指令
  Vue.directive('autofocus', {
    // 指令第一次绑定到元素时调用
    bind() {
      console.log('bind')
    },
    // 被绑定元素插入父节点时调用
    inserted(el) {
      el.focus()
    },
    // 所在组件的 VNode 更新时调用
    update() {},
    // 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
    componentUpdated() {},
    // 只调用一次，指令与元素解绑时调用。
    unbind() {}
  })
  /* <input v-autofocus/> */
  Vue.directive('color-swatch', function(el, bingding) {
    if (bingding.value.hasOwnProperty('bgColor')) {
      el.style.background = bingding.value.bgColor
    }
  })
  // <div v-color-swatch="{bgColor:'red'}"></div>
}
