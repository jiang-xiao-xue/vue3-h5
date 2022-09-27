<!--
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-07-08 15:27:27
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-09-27 14:12:56
 * @FilePath: \my-vue3-h5\src\views\home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>home</div>
  <!-- <div @click="handle" v-authbtn="'user-test1'">test</div> -->
  <div @click="handle" class="btn">APi调用测试</div>
  <div @click="handle1" class="btn">标签调用测试</div>
  <div @click="handle2" class="btn">h函数调用测试</div>
  <div @click="handle3" class="btn">jsx函数调用测试</div>
  <r-modal v-model="show"
           title="演示-提交表单"
           close
           mask-close
           :opacity="0.3"
           :loading="loading"
           @on-confirm="handleConfirm">
           <input type="text">
  </r-modal>
</template>

<script lang="tsx" setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import useGlobal from '@/hooks/useGlobal/index';
const { ctx } = getCurrentInstance() as any;
const that = ctx.$.appContext.config.globalProperties;
const { $modal } = useGlobal();
const loading = ref<boolean>(false);
const show = ref<boolean>(false);
const handle = (() => {
  // that.$request.get('common.user').then((res: any) => {
  //     console.log(res);
  //   })
  // API调用
   $modal.show({
      title: '演示',
      close: true, // 关闭x号
      content: 'hello world~',
      maskClose: true, // 点击蒙版关闭
      opacity: 0.5,
      onConfirm() {
        console.log('点击确定');
      },
      onCancel() {
        console.log('点击取消');
      }
    });
})
const handle1 = () => {
  show.value = true;
}
const handleConfirm = () => {
  show.value = false;
}

const handle2 = () =>{
  $modal.show({
        title: '演示-API调用弹框',
        content(h) {
          return h(
            'div',
            {
              style: 'color:red;',
              onClick: ($event: Event) => console.log('clicked', $event.target)
            },
            'hello world ~'
          );
        }
      });
}

const handle3 = () => {
  $modal.show({
        title: '演示-jsx调用弹框',
        content(h) {
          return (
            <div
              onClick={($event: Event) => console.log('clicked', $event.target)}
            >
              hello world ~
            </div>
          );
        }
      });
}

</script>
<style scoped lang="scss">
.btn {
  width: 50px;
  height: 30px;
  background: #000;
  color: #fff;
}
</style>