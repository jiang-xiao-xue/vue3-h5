
<!--
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-06-22 10:30:33
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-07-09 10:27:51
 * @FilePath: \my-vue3-h5\src\views\home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="h-container">
      <!-- baner轮播 -->
      
      <div class="h-baner swiper mySwiper">
        <swiper :modules="modules"
                :autoplay="options.autoplay"
                :loop="options.loop"
                :pagination="{ clickable: true }"
                @swiper="onSwiper">
            <swiper-slide v-for="(item, index) in swiperImg.imgurl" :key="index">
              <img :src="item" alt="">
            </swiper-slide> 
        </swiper>
      </div>
       <!-- 需要定位的菜单标题 -->
      <div class="h-tittle">
        <img class="logo" src="http://leishen.oss-cn-qingdao.aliyuncs.com/jxx/leishenH5/index/logo.png" alt="">
        <img class="menu" src="http://leishen.oss-cn-qingdao.aliyuncs.com/jxx/leishenH5/index/menu.png" alt="" @click="openMenu">
      </div>
     <!-- 雷神产品-可滑动 -->
      <div class="content-title black-deep">
        <div class="title">雷神产品</div>
        <img class="title-bg" src="http://leishen.oss-cn-qingdao.aliyuncs.com/jxx/leishenH5/index/title-bg.png" alt="">
      </div>
      <div class="h-content black-deep">
        <!-- 循环content -->
        <div class="content" v-for="(item, index) in product.thun" :key="index">
          <img :src="item.imgurl" alt="">
          <div class="content-bottom">
            <div class="box">
              <div class="pro-title">{{item.name}}</div>
              <div class="pro-desc">{{item.desc}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 机械师产品-可滑动 -->
      <div class="content-title black">
        <div class="title">机械师产品</div>
        <img class="title-bg" src="http://leishen.oss-cn-qingdao.aliyuncs.com/jxx/leishenH5/index/title-bg.png" alt="">
      </div>
      <div class="h-content black">
        <!-- 循环content -->
        <div class="content" v-for="(item, index) in product.mach" :key="index">
          <img :src="item.imgurl" alt="">
          <div class="content-bottom">
            <div class="box">
              <div class="pro-title">{{item.name}}</div>
              <div class="pro-desc">{{item.desc}}</div>
            </div>
          </div>
        </div>
       
      </div>
      <!-- 新闻资讯 -->
      <div class="content-title black-deep">
        <div class="title">新闻资讯</div>
        <img class="title-bg" src="http://leishen.oss-cn-qingdao.aliyuncs.com/jxx/leishenH5/index/title-bg.png" alt="">
      </div>
      <div class="h-newinfo black-deep">
        <div class="new-content">
          <img src="./img/new-info.png" alt="">
          <div class="new-title">
            <p>青岛市政协主席参观竞界·电竞综合体</p>
            <p class="time">2022-02-23</p>
          </div>
        </div>
        <!-- 循环new-line -->
        <div class="new-line">
          <div class="image"></div>
          <div class="info-text">
            <div class="text">新闻标题标题</div>
            <div class="time">2022-02-05</div>
          </div>
        </div>
        <div class="more-btn">了解更多></div>
      </div>
      <div class="h-enterprise">
        <img class="logo" src="http://leishen.oss-cn-qingdao.aliyuncs.com/jxx/leishenH5/index/bot-logo.png" alt="">
        <div class="desc">
          竞 App 集硬件购买、售后服务、赛事参与、电竞酒店预订、电竞书房定制等功能于一体，致力于为广大电竞爱好者带来最贴心的电竞全场景聚合服务平台。 雷神科技作为“大众创业、万众创新”背景下成长起来的创业公司，以不懈的品质追求及“用户为是、自以为非”的用户理念为发展基石，创立三年多时间就在新三板挂牌上市并进入创新层，成为“电竞生态”第一股（股票简称：雷神科技，股票代码：872190），正式开启资本市场之路。七年时间凭借产品及品牌的深厚实力，迅速获得了2300多万电竞爱好者的认可。 未来，雷神科技将以全场景电竞硬件快速迭代和电竞生态产业快速布局为着力点，围绕着电竞酒店、电竞赛事、电竞教育、电竞产业园等实现电竞全产业链闭环，全力打造“雷神电竞”生态品牌！
        </div>
        <div class="more">了解更多>></div>
      </div>
      <Footer />
      <Menu @isShow="close" v-if="isShow"/>
  </div>
</template>
<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'; // swiper所需组件
// 这是分页器和对应方法，swiper好像在6的时候就已经分离了分页器和一些其他工具
import {Pagination,A11y, Autoplay } from 'swiper';
import { reactive, ref, Ref, onMounted, getCurrentInstance } from 'vue'
import $  from 'jquery'

// 对应css 如果使用less或者css只需要把scss改为对应的即可
import 'swiper/scss';
import 'swiper/scss/pagination';
import Footer from '@/components/footer.vue'
import Menu from '@/components/menu.vue'
const { ctx } = getCurrentInstance();
const that = ctx.$.appContext.config.globalProperties;
const onSwiper = (swiper: any) => {
    console.log(swiper);
};
const close = ((e: Boolean) => {
  isShow.value = e;
})

let isShow: Ref<Boolean> = ref(false); 

const openMenu = (() => {
  isShow.value = true;
  // console.log(import.meta.env);
  that.$request.get('common.user', {}).then((res: any) => {
    console.log(res);
  })
 
})

// const onSlideChange = (e: any) => { // swiper切换的时候执行的方法
//     console.log('slide change',e.activeIndex);
// };
// setup语法糖只需要这样创建一个变量就可以正常使用分页器和对应功能，如果没有这个数组则无法使用对应功能
const modules = [ Pagination, A11y, Autoplay];
let options = reactive({
    autoplay:true,
    loop: true,
});
let swiperImg = reactive({
  imgurl:['https://tse3-mm.cn.bing.net/th/id/OIP-C.TnFdva8pA7eU8r-2eyhrmQHaMu?pid=ImgDet&rs=1','https://tse3-mm.cn.bing.net/th/id/OIP-C.q21wuz0qvEobncTJsguLGQHaNK?pid=ImgDet&rs=1']
})

let product = reactive({
  thun: [
    {
      imgurl: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.q21wuz0qvEobncTJsguLGQHaNK?pid=ImgDet&rs=1',
      name: '雷神笔记本',
      desc: '全新设计语言，雷神笔记本'
    },
    {
      imgurl: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.q21wuz0qvEobncTJsguLGQHaNK?pid=ImgDet&rs=1',
      name: '雷神笔记本',
      desc: '全新设计语言，雷神笔记本'
    },
  ],
  mach: [
    {
      imgurl: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.TnFdva8pA7eU8r-2eyhrmQHaMu?pid=ImgDet&rs=1',
      name: '雷神笔记本',
      desc: '全新设计语言，雷神笔记本'
    },
    {
      imgurl: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.TnFdva8pA7eU8r-2eyhrmQHaMu?pid=ImgDet&rs=1',
      name: '雷神笔记本',
      desc: '全新设计语言，雷神笔记本'
    },
  ]
})


</script>
<style lang="scss">
/* @import '@/assets/css/index.css'; */
.h-container .h-baner {
    width: 7.5rem;
    height: 11.2rem;
    position: relative;
    overflow-x: hidden;
 }
 .swiper-slidet, .swiper-slide-active {
    width: 7.5rem !important;
 }
 .swiper-slide img {
    display: block;
    width: 7.5rem;
    height: 11.2rem;
    object-fit: cover;
    border: none;
  }
  /* 轮播点 */
  .swiper-pagination-bullet {
    background: #ccc;
  }
  .swiper-pagination-bullet-active {
    background: #2B2B2B;
    border: 0.01rem solid #00EFFA;
  }
  
  .swiper-pagination-bullets {
    bottom: 0 !important;
  }
 .h-container .h-tittle {
    width: 7.5rem;
    height: 1rem;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    z-index: 2;
    
 }
 .h-container .h-tittle .logo {
    width: 1.21rem;
    height: 0.65rem;
    margin: 0.2rem;
 }
 .h-container .h-tittle .menu {
    width: 0.47rem;
    height: 0.46rem;
    margin: 0.2rem;
 }
 .h-container .h-content {
    width: 7.5rem;
    height: 5.72rem;
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    margin-top: -0.01rem;
 }
 .h-container .h-content .content {
    width: 3.8rem;
    height: 4.57rem;
    margin-top: 0.36rem;
    margin-right: 0.4rem;
    display: inline-block;
    position: relative;
 }
 .h-container .h-content .content img {
    width: 3.8rem;
    height: 4.57rem;
    margin: 0;
 }
 .h-container .h-content :first-child{
    margin-left: 0.4rem;
 }
 .h-container .h-content :last-child{
    margin-right: 0.4rem;
 }
 .h-container .h-content .content .content-bottom {
    width: 3.8rem;
    height: 1.3rem;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 0;
 }
 .h-container .h-content .content .content-bottom .box {
    width: 3.6rem;
    height: 1.1rem;
    border: 0.01rem solid #00EFFA;
    margin: 0.1rem;
    text-align: left;
    box-sizing: border-box;
 }
 .h-container .h-content .content .content-bottom .box .pro-title {
    width: 3.1rem;
    margin-top: 0.27rem;
    margin-left: 0.29rem;
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #00EFFA;
    font-size: 0.3rem;
 }
 .h-container .h-content .content .content-bottom .box .pro-desc {
    width: 3.1rem;
    font-size: 0.18rem;
    margin-left: 0.29rem;
    color: #fff;
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
 }

 .h-container .h-newinfo {
    width: 7.5rem;
    padding-bottom: 0.4rem;
 }
 .h-container .h-newinfo .new-content {
    width: 6.23rem;
    margin: 0 auto;
    margin-top: -0.01rem;
    padding-top: 0.35rem;
 }
 .h-container .h-newinfo .new-content img {
    width: 6.23rem;
    height: 4.26rem;
 }
 .h-container .h-newinfo .new-content .new-title {
    width: 5.83rem;
    height: 0.8rem;
    background: #00EFFA;
    margin-top: -0.3rem;
    padding: 0.2rem;
    color: #000;
    font-size: 0.3rem;
 }
 .h-container .h-newinfo .new-content .new-title :nth-of-type(1) {
    width: 5.83rem;
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
 }
 .h-container .h-newinfo .new-content .new-title .time {
   font-size: 0.2rem;
 }
 .h-container .h-newinfo .new-line {
   width: 6.2rem;
   height: 1.38rem;
   margin: 0 auto;
   margin-top: 0.4rem;
   background: #2B2B2B;
   display: flex;
 }
 .h-container .h-newinfo .new-line .image {
   width: 1.42rem;
   height: 0.97rem;
   margin: 0.2rem;
   background: black;
 }
 .h-container .h-newinfo .new-line .image img {
    width: 1.42rem;
    height: 0.97rem;
 }
 .h-container .h-newinfo .new-line .info-text {
    width: 4rem;
    height: 0.97rem;
    margin: 0.2rem 0;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
 }
 .h-container .h-newinfo .new-line .info-text .text {
    font-size: 0.3rem;
    color: #00EFFA;
    width: 4rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
 }
 .h-container .h-newinfo .new-line .info-text .time {
    font-size: 0.2rem;
    color: #999;
    width: 4rem;
 }
 .h-container  .h-enterprise {
   width: 7.5rem;
   height: 8.7rem;
   padding-top: 1.43rem;
   background: url(http://leishen.oss-cn-qingdao.aliyuncs.com/jxx/leishenH5/index/info-bg.png) center center no-repeat;
   background-size: 100% 100%;
 }
 .h-container  .h-enterprise .logo{
   width: 2.55rem;
   height: 1.36rem;
   display: block;
   margin: 0 auto;
 }
 .h-container  .h-enterprise .desc {
   width: 6.58rem;
   height: 4.44rem;
   margin: 0.4rem auto;
   color: #E6E6E6;
   font-size: 0.24rem;
   text-indent : 0.2rem;
   letter-spacing: 0.03rem;
 }
 .h-container  .h-enterprise .more {
   width: 1.5rem;
   height: 0.3rem;
   color: #00EFFA;
   font-size: 0.26rem;
   margin: 0.5rem;
   float: right;
 }
</style>