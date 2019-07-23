<template>
  <div class="sign-component">
    <div class="canvasBox">
      <canvas
        :width="canvasWidth"
        :height="canvasHeight"
        ref="canvasSign"
        @mouseout="isDown = false"
        @mousedown="mouseDown($event)"
        @mousemove="mouseMove($event)"
        @mouseup="mouseUp($event)"
        @touchstart="touchstart($event)"
        @touchmove="touchmove($event)"
        @touchend="touchend($event)"
      >
      </canvas>
    </div>
    <div class="btn-box">
      <button @click="overwrite">重绘</button>
      <button @click="commit">确定</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'sign', //签字面板
  props: {
    width: {
      type: Number,
      default: 800
    },
    height: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {
      isDown: false,
      canvasBoard: null,
      canvasContext: null
    }
  },
  computed: {
    canvasWidth() {
      return this.width * window.devicePixelRatio
    },
    canvasHeight() {
      return this.height * window.devicePixelRatio
    },
    lineWidth() {
      return 1 * window.devicePixelRatio
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.canvasBoard = this.$refs.canvasSign
      this.canvasContext = this.canvasBoard.getContext('2d')
      this.canvasContext.lineWidth = this.lineWidth
      this.canvasContext.strokeStyle = '#000'
      this.canvasContext.lineCap = 'round'
      this.canvasContext.lineJoin = 'round'
      this.canvasContext.shadowBlur = 1
      this.canvasContext.shadowColor = '#000'
    },
    mouseDown(ev) {
      ev.preventDefault()
      ev.stopPropagation()
      this.canvasContext.beginPath()
      this.canvasContext.moveTo(ev.offsetX, ev.offsetY)
      this.isDown = true
    },

    mouseMove(ev) {
      ev.preventDefault()
      ev.stopPropagation()
      if (this.isDown) {
        this.canvasContext.lineTo(ev.offsetX, ev.offsetY)
        this.canvasContext.stroke()
      }
    },

    mouseUp(ev) {
      ev.preventDefault()
      ev.stopPropagation()
      this.canvasContext.closePath()
      this.isDown = false
    },
    touchstart(ev) {
      ev.preventDefault()
      ev.stopPropagation()
      let x = ev.targetTouches[0].pageX - this.canvasBoard.offsetLeft
      let y = ev.targetTouches[0].pageY - this.canvasBoard.offsetTop
      this.canvasContext.beginPath()
      this.canvasContext.moveTo(x, y)
    },
    touchmove(ev) {
      ev.preventDefault()
      ev.stopPropagation()
      let x = ev.targetTouches[0].pageX - this.canvasBoard.offsetLeft
      let y = ev.targetTouches[0].pageY - this.canvasBoard.offsetTop
      this.canvasContext.lineTo(x, y)
      this.canvasContext.stroke()
    },
    touchend: function(ev) {
      ev.preventDefault()
      ev.stopPropagation()
      this.canvasContext.closePath()
    },
    // Over write
    overwrite() {
      this.canvasContext.clearRect(
        0,
        0,
        this.$refs.canvasSign.width,
        this.$refs.canvasSign.height
      )
    },
    // Commit
    commit() {
      let signBase64 = this.$refs.canvasSign.toDataURL()
    }
  }
}
</script>
<style scoped lang="scss">
canvas {
  border: 1px solid #333;
  border-radius: 5px;
}
.btn-box > button {
  background: rgba(252, 0, 252, 0.1);
  width: 100px;
  height: 50px;
  margin: 10px 20px;
  // @include px2px(font-size,32px);
  font-size: 32px;
  border: 1px solid rgba(252, 0, 252, 0.2);
  border-radius: 25px;
}
</style>

// 相关知识点整理 touches: 当前屏幕上所有触摸点的列表; targetTouches:
当前对象上所有触摸点的列表; changedTouches: 涉及当前(引发)事件的触摸点的列表
通过一个例子来区分一下触摸事件中的这三个属性： 1.
用一个手指接触屏幕，触发事件，此时这三个属性有相同的值。 2.
用第二个手指接触屏幕，此时，touches有两个元素，每个手指触摸点为一个值。当两个手指触摸相同元素时，
targetTouches和touches的值相同，否则targetTouches
只有一个值。changedTouches此时只有一个值，
为第二个手指的触摸点，因为第二个手指是引发事件的原因 3.
用两个手指同时接触屏幕，此时changedTouches有两个值，每一个手指的触摸点都有一个值
4. 手指滑动时，三个值都会发生变化 5.
一个手指离开屏幕，touches和targetTouches中对应的元素会同时移除，而changedTouches仍然会存在元素。
6.
手指都离开屏幕之后，touches和targetTouches中将不会再有值，changedTouches还会有一个值，
此值为最后一个离开屏幕的手指的接触点。 2. 触点坐标选取
touchstart和touchmove使用: e.targetTouches[0].pageX 或
(jquery)e.originalEvent.targetTouches[0].pageX touchend使用:
e.changedTouches[0].pageX 或 (jquery)e.originalEvent.changedTouches[0].pageX
3.touchmove事件对象的获取
想要在touchmove:function(e,参数一)加一个参数，结果直接使用e.preventDefault()就会
e 报错，处理方法为使用arguments[0]获取event参数 touchmove:function(e,参数一){
　　var e=arguments[0] 　　e.preventDefault() } 4
ev.preventDefault();禁止浏览器默认行为
ev.stopPropagation();取消冒泡（子元素=》父元素依次触发事件）
