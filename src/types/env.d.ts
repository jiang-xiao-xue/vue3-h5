/*
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-06-22 10:16:01
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-06-28 16:58:23
 * @FilePath: \my-vue3-h5\src\env.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module 'qs'
interface ImportMetaEnv {
  VITE_MODE_NAME: string,
  VITE_APP_ID: string,
  VITE_AGENT_ID: string,
  VITE_LOGIN_TEST: string,
  VITE_RES_URL: string,
  VITE_APP_TITLE: string,
  VITE_APP_PORT: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}