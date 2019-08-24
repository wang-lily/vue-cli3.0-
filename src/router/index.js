/*eslint-disable*/
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'

import VM from '@/main'

Vue.use(Router)

const routerList = [];
function importAll(r){
  r.keys().forEach(key=>{
    routerList.push(r(key).default)
  })
}

importAll(require.context('./',true,/\.routes\.js/));

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
      // 会匹配所有路径
      path: "*",
      // component: NOtFundComponent
    },
    {
      // 会匹配以 `/user-` 开头的任意路径
      path: "/user-*"
    },
    ...routerList
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
    VM.$store.commit("changeRedirect",to.fullPath);
      next({
        path: "/login",
        replace: true
      });
  } else {
    next();
  }
})
export {router}
