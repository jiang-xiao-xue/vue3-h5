/*
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-08-04 16:04:12
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-08-04 17:08:32
 * @FilePath: \vue3-h5\src\hooks\useGlobal\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getCurrentInstance } from 'vue';

export default function useGlobal() {
  const {
    appContext: {
      config: { globalProperties }
    }
  } = (getCurrentInstance() as unknown) as ICurrentInstance;

  return globalProperties;
}