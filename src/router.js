/*eslint-disable*/
import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import { VM } from "@/main";

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "@/views/About")
    },
    {
      path: "/my-swiper",
      name: "my-swiper",
      component: () =>
        import(/* webpackChunkName: "my-swiper" */ "@/views/MySwiper")
    },
    {
      path: "/carId",
      name: "CarId",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "carId" */ "@/views/CarId")
    },
    {
      path: "/center",
      component: Center,
      children: [
        {
          path: "myAccount",
          name: "MyAccount",
          meta: {
            requiresAuth: true
          },
          components: {
            //定义路由视图，按需加载视图
            // <router-view></router-view>
            // <router-view name="myAccount"></router-view>
            // <router-view name="mySetting"></router-view>
            default: MyAccount,
            myAccount: Yue,
            mySetting: Jiaoyijilu
          }
        },
        {
          path: "myAccount-yue",
          name: "MyAccount",
          components: {
            default: MyAccount,
            myAccount: Yue
          }
        },
        {
          path: "myAccount-jiaoyijilu",
          name: "MyAccount",
          components: {
            default: MyAccount,
            mySetting: Jiaoyijilu
          }
        },
        { path: "myOrder", name: "MyOrder", component: MyOrder },
        { path: "myProject", name: "MyProject", component: MyProject },
        { path: "mySetting", name: "MySetting", component: MySetting }
      ]
    },
    {
      // 会匹配所有路径
      path: "*",
      component: NOtFundComponent
    },
    {
      // 会匹配以 `/user-` 开头的任意路径
      path: "/user-*"
    }
  ],
  //浏览器的滚动行为只能在history模式下使用
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      //到指定位置 锚点
      return {
        selector: to.hash
      };
    } else if (savedPosition) {
      //只有后退和前进的情况下回到保存的位置
      return savedPosition;
    } else {
      //置零
      return { x: 0, y: 0 };
    }
  }
});
//全局路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !VM.$store.state.token) {
    // 判断该路由是否需要登录权限 当前的token是否存在
    VM.$store.commit("changeRedirect", to.fullPath);
    next({
      path: "/login",
      replace: true
    });
  } else {
    next();
  }
});
export { router };
