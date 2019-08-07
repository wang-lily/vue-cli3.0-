<template>
  <div class="to-top">
    <div class="nomarl" :class="toggle" @click="scrollTop">
      <i class="arrow"></i>
    </div>
  </div>
</template>
<script>
// import { clearInterval } from 'timers';
export default {
  name: 'to-top',
  props: {
    showY: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      toggleClass: ['', 'd-show'],
      timer: null,
      scrollT: document.documentElement.scrollTop || document.body.scrollTop
    }
  },
  computed: {
    toggle() {
      if (this.scrollT > this.showY) {
        return this.toggleClass[1]
      } else {
        return this.toggleClass[0]
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollEvent)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollEvent)
    this.timer && clearInterval(this.timer)
  },
  methods: {
    scrollEvent() {
      this.scrollT =
        document.documentElement.scrollTop || document.body.scrollTop
    },
    //滚动到顶部
    scrollTop() {
      let step = -this.scrollT / 30
      this.timer = setInterval(() => {
        this.scrollT =
          document.documentElement.scrollTop || document.body.scrollTop
        document.body.scrollTop = document.documentElement.scrollTop =
          this.scrollT + step
        if (this.scrollT == 0) {
          clearInterval(this.timer)
        }
      }, 10)
    }
  }
}
</script>
<style lang="scss" scoped>
.to-top {
  .nomarl {
    position: fixed !important;
    z-index: 2000;
    right: 20px;
    bottom: 20px;
    width: 40px;
    height: 40px;
    border: 2px solid #ccc;
    border-radius: 50%;
    margin: 0;
    background: burlywood;
    @include arrow-top(10px, 44%, 3px, #333, -45deg);
    transform: rotateX(90deg);
    transform-origin: 50% 100%;
    opacity: 0;
    transition-property: transform, opacity;
    transition-duration: 0.3s;
  }
  .d-show {
    transform: rotateX(0deg);
    opacity: 1;
  }
}
</style>
