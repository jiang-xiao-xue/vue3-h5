/*
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-06-22 10:16:01
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-08-04 17:15:25
 * @FilePath: \my-vue3-h5\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import App from './App.vue'
// import Swiper from 'swiper'
import router from '@/router/index'
import globa from '@/plugins/index'
import 'lib-flexible/flexible'
import Toast from '@/components/Toast/index'
// app.use(Toast) 用use来全局载入会导致我们不能使用this的地方不太好调用。
import loading from '@/directives/loading/index'
import authBtn from '@/directives/authBtn/index'
import Modal, { IConfig } from '@/plugins/modal/index';

const app = createApp(App);
app.config.globalProperties.$toast = Toast;
app.directive('loading', loading);
app.directive('authbtn', authBtn);
app.use(globa);
app.use(
  Modal as any,
  {
    style: {
      opacity: 0.5
    },
    props: {
      close: false,
      maskClose: false
    }
  } as IConfig
);
app.use(router);
app.mount('#app')
