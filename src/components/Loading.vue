<template>
  <div class="comp-loading">
    <span
      class="animated infinite bounce slow"
      :class="style[index + 1]"
      v-for="(item, index) of list"
      :key="index"
      >{{ item }}</span
    >
  </div>
</template>
<script>
export default {
  name: 'loading',
  data() {
    return {
      list: 'Loading...'.split(''),
      style: [
        'delay-1',
        'delay-2',
        'delay-3',
        'delay-4',
        'delay-5',
        'delay-6',
        'delay-7',
        'delay-8',
        'delay-9',
        'delay-10',
        'delay-11',
        'delay-12'
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin delay($time) {
  -webkit-animation-delay: $time;
  animation-delay: $time;
}
.comp-loading {
  .animated {
    font-size: 58px;
    display: inline-block !important;
  }
  .delay-1 {
    @include delay(0.1s);
  }
  .delay-2 {
    @include delay(0.2s);
  }
  .delay-3 {
    @include delay(0.3s);
  }
  .delay-4 {
    @include delay(0.4s);
  }
  .delay-5 {
    @include delay(0.5s);
  }
  .delay-6 {
    @include delay(0.6s);
  }
  .delay-7 {
    @include delay(0.7s);
  }
  .delay-8 {
    @include delay(0.8s);
  }
  .delay-9 {
    @include delay(0.9s);
  }
  .delay-10 {
    @include delay(1s);
  }
  .delay-11 {
    @include delay(1.1s);
  }
  .delay-12 {
    @include delay(1.2s);
  }
}
</style>
