export default {
    path: "/test",
    name: "test",
    component: () => import(/* webpackChunkName: "about" */ "@/views/Test"),
    children: []
  }