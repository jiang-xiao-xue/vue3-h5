<!--
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-08-05 14:50:22
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-08-05 17:03:57
 * @FilePath: \vue3-h5\src\plugins\modal\README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
### API 调用方式

(```)
 <div @click="handle" class="btn">APi调用测试</div>
 import useGlobal from '@/hooks/useGlobal/index';
 const { $modal } = useGlobal();
 const handle = (() => {
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
(```)

###  HTML内标签方式

(```)
<div @click="handle1" class="btn">标签调用测试</div>
<r-modal v-model="show"
           title="演示-提交表单"
           close
           mask-close
           :opacity="0.3"
           :loading="loading"
           @on-confirm="handleConfirm">
           <input type="text">
</r-modal>
import { ref } from 'vue'
const loading = ref<boolean>(false);
const show = ref<boolean>(false);
const handle1 = () => {
  show.value = true;
}
const handleConfirm = () => {
  show.value = false;
}
(```)

### h函数调用方式

(```)
<div @click="handle2" class="btn">h函数调用测试</div>
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
(```)

### jsx语法调用方式
- 注意：使用jsx语法之前需要在vite中下载并使用对应插件（在vite.config.ts中）
(```)
// 引入插件
import vueJsx from '@vitejs/plugin-vue-jsx'
plugins: [
      vue(),
      vueJsx()
],

<div @click="handle3" class="btn">jsx函数调用测试</div>

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

(```)