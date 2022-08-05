/*
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-08-04 16:06:57
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-08-04 17:07:11
 * @FilePath: \vue3-h5\src\global.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ComponentInternalInstance } from 'vue';
import { IModal } from '@/plugins/modal/modal.type';

declare global {
  interface IGlobalAPI {
    $modal: IModal;
    // 一些其他
    // $request: any;
  }
  interface ICurrentInstance extends ComponentInternalInstance {
    appContext: {
      config: { globalProperties: IGlobalAPI };
    };
  }
}
export {};