/*
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-06-22 10:23:45
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-08-03 12:02:40
 * @FilePath: \my-vue3-h5\src\router\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'Home',
    // meta: {roleCode: 'home'},
    component: () => import(/* webpackChunkName: "Home" */ '@/views/home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/register/login.vue')
  },
  {
    path: '/sigin',
    name: 'Sigin',
    component: () => import(/* webpackChunkName: "Sigin" */ '@/views/register/sigin.vue')
  },
  { path: '/', redirect: { name: 'Home' } }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});
// 路由鉴权
// 思路：用户登录是应该返回角色权限集合，前台获取录入本地存储当中（sessionStorage）
const getRouterArr = (type: String) => {
  switch(type) {
    case 'Admin':
      return ['system-user', 'system-setting'];
    case 'DeptAdmin':
      return ['system-user'];
    case 'Common':
      return [];
  }
}

router.beforeEach((to, _from, next) => {
  let token = window.localStorage.getItem('authorization');
  token = eval('(' + token + ')');
  if (to.meta && to.meta.roleCode) {
    let needCode = to.meta.roleCode as string;
    if (getRouterArr('Admin')!.indexOf(needCode) > -1 && token) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
})

export default router;