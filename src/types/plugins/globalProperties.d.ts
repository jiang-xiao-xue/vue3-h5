/*
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-06-28 16:30:04
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-06-28 16:30:17
 * @FilePath: \my-vue3-h5\src\plugins\globalProperties.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export {}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    // this.代码补全配置
    $request: MyRequest.request,
    $image: (src: string) => void
  }
}