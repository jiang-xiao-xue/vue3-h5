<!--
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-07-15 15:38:45
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-07-15 15:58:24
 * @FilePath: \my-vue3-h5\src\components\toast\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
<div class="toast-box" >
    <p class="toast-value" :style="{background: background, color: color}">
        {{ value }}
    </p> 
</div>
</template>    
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'Toast',
    props: {
        value: {
            type: String,
            default: ''
        },
        duration: {
            type: Number,
            default: 3000
        },
        background: {
            type: String,
            default: '#000'
        },
        color: {
            type: String,
            default: '#fff'
        }
    }
})
</script>

<style>
.toast-box  {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.toast-value {
  max-width: 100px;
  background: rgb(8, 8, 8);
  padding: 8px 10px;
  border-radius: 4px;
  text-align: center;
  display: inline-block;
  animation: anim 0.5s;
}
@keyframes anim { 
    0% {opacity: 0;}
    100%{opacity:1;}
}
.toast-value.remove{
    animation: remove 0.5s;
}
@keyframes remove { 
    0% {opacity: 1;}
    100%{opacity:0;}
}
</style>
