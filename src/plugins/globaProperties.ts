/*
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-06-28 16:25:59
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-06-28 16:40:12
 * @FilePath: \my-vue3-h5\src\plugins\globaProperties.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { App } from 'vue'
import request from '@/utils/request'
/**
 * @name: jiangxx
 * @date: 2022-06-28
 * @desc: 格式化网络资源
 */
 const formatImage = (src: string): string => {
  if (!src) return ''
  if (src.includes('http')) return src
  return `${import.meta.env.VITE_RES_URL}${src}`
 }

 const install = (app: App) => {
  // 注册请求实例
  app.config.globalProperties.$request = request;
  app.config.globalProperties.$image = formatImage;
}
export default install;