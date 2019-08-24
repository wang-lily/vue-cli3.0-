export default {
    path: "/my-swiper",
    name: "my-swiper",
    component: () => import(/* webpackChunkName: "my-swiper" */ "@/views/MySwiper"),
    children: []
  }