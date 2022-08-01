<!--
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-07-08 15:27:27
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-08-01 17:51:01
 * @FilePath: \my-vue3-h5\src\views\home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>home</div>
  <div @click="handle" v-authbtn="'user-test1'">test</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
const { ctx } = getCurrentInstance();
const that = ctx.$.appContext.config.globalProperties;
const handle = (() => {
  that.$request.get('common.user').then((res: any) => {
      console.log(res);
    })
})

</script>
<style scoped lang="scss">

</style>