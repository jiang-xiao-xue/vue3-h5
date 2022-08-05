/*
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-08-04 15:38:57
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-08-04 16:50:56
 * @FilePath: \vue3-h5\src\plugins\modal\config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { IConfig } from './modal.type';
const config: IConfig = {
  style: {
    // 遮罩透明度，默认 0.7
    opacity: 0.7
  },
  props: {
    // 是否显示右上角的关闭按钮，默认开启
    close: true,
    // 点击蒙层是否允许关闭，默认开启
    maskClose: true
  }
};
export default config;