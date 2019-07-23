<template>
  <div class="my-swiper">
    <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
      <!-- slides -->
      <swiper-slide>
        <div class="img-box">
          <img src="@/assets/imgs/test/lb16.png" alt="" />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="img-box">
          <img src="@/assets/imgs/test/lb19.png" alt="" />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="img-box">
          <img src="@/assets/imgs/test/lb18.png" alt="" />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="img-box">
          <img src="@/assets/imgs/test/lb24.png" alt="" />
        </div>
      </swiper-slide>
      <div class="swiper-pagination"></div>
      <!-- <div class="swiper-button-prev" slot="button-prev">
          <i class="arrow"></i>
      </div>
      <div class="swiper-button-next" slot="button-next">
        <i class="arrow"></i>
      </div> -->
    </swiper>
    <swiper
      :options="swiperOptionThumbs"
      class="gallery-thumbs"
      ref="swiperThumbs"
    >
      <swiper-slide>
        <div class="img-box">
          <img src="@/assets/imgs/test/lb16.png" a="1" alt="" />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="img-box">
          <img src="@/assets/imgs/test/lb19.png" a="1" alt="" />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="img-box">
          <img src="@/assets/imgs/test/lb18.png" a="1" alt="" />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="img-box">
          <img src="@/assets/imgs/test/lb24.png" a="1" alt="" />
        </div>
      </swiper-slide>
    </swiper>
    <swiper
      :options="swiperOptionCube"
      ref="swiperCube"
      class="swiper-cube"
      @slideNextTransitionEnd="test"
    >
      <swiper-slide>
        <div class="img-box" :class="active == 5 && testClass">
          <img src="@/assets/imgs/test/lb18.png" alt="" />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="img-box" :class="active == 2 && testClass">
          <img src="@/assets/imgs/test/lb19.png" alt="" />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="img-box" :class="active == 3 && testClass">
          <img src="@/assets/imgs/test/lb24.png" alt="" />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="img-box" :class="active == 4 && testClass">
          <img src="@/assets/imgs/test/lb16.png" alt="" />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { setTimeout } from 'timers'
export default {
  name: 'my-swiper',
  data() {
    return {
      active: 5,
      testClass: 'animated pulse',
      swiperOptionTop: {
        direction: 'vertical',
        spaceBetween: 0,
        autoplay: true,
        loop: true,
        loopedSlides: 4, //looped slides should be the same
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
          dynamicMainBullets: 2
        }
      },
      swiperOptionThumbs: {
        effect: 'cube',
        grabCursor: true,
        cubeEffect: {
          slideShadows: false,
          shadow: false
        }
      },
      swiperOptionCube: {
        effect: 'cube',
        // direction: 'vertical',
        autoplay: {
          delay: 4000
        },
        grabCursor: true,
        loop: true,
        cubeEffect: {
          slideShadows: false,
          shadow: false
          // shadowOffset: 100,
          // shadowScale: 0.6
        }
      },
      swiperCube: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.swiper
      const swiperThumbs = this.$refs.swiperThumbs.swiper
      this.swiperCube = this.$refs.swiperCube.swiper
      swiperTop.controller.control = swiperThumbs
      swiperThumbs.controller.control = swiperTop
      // swiperThumbs.controller.control = swiperTop
    })
  },
  components: {
    swiper,
    swiperSlide
  },
  methods: {
    init() {},
    test() {
      this.active = this.swiperCube.activeIndex
    }
  }
}
</script>
<style lang="scss" scoped>
@keyframes my-pulse {
  from {
    transform: scale(1);
  }
  30% {
    transform: scale(2);
  }
  70% {
    transform: scale(2);
  }
  to {
    transform: scale(1);
  }
}
.my-swiper {
  position: relative;
  height: 100px;
  width: 100%;
  .swiper-button-prev,
  .swiper-button-next {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.3);
    top: 50%;
    transform: scale(0.5) translateY(-50%);
  }
  .swiper-button-next {
    @include arrow-right(15px, 40%, 6px, #333, 45deg);
    position: absolute;
  }
  .swiper-button-prev {
    @include arrow-left(15px, 40%, 6px, #333, -135deg);
    position: absolute;
  }
  .gallery-top {
    height: 100%;
    width: 100%;
  }
  .gallery-thumbs {
    position: absolute;
    top: 0;
    right: 30px;
    box-sizing: border-box;
    height: 100%;
    width: 10%;
    padding: 10px 0;
    @include flex-center-center;
    flex-direction: column !important;
  }
  .gallery-thumbs .swiper-slide {
    width: 100%;
    height: 25%;
    @include flex-center-center;
  }
  .gallery-thumbs .swiper-slide-active {
  }
  .img-box {
    border-radius: 5px;
    width: 100%;
    height: 100%;
    @include img-box-cover;
  }
  .swiper-cube {
    margin-top: 10px;
    width: 100px;
    height: 100px;
    .pulse {
      animation-name: my-pulse;
    }
  }
}
</style>
