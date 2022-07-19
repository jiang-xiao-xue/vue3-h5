/*
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-06-22 10:23:45
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-07-08 17:04:42
 * @FilePath: \my-vue3-h5\src\router\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'Home',
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
})

export default router;