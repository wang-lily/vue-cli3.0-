<template>
  <div class="loading-flower">
    <div class="blockG" v-for="i of 8" :key="i"></div>
  </div>
</template>
<script>
export default {
    name:"LoadingFlower"
};
</script>
<style scoped lang="scss">
.loading-flower{
  @include loading-flower(0.5,#f0f);
}
</style>