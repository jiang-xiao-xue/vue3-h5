/*
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-06-28 16:04:13
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-06-29 15:17:45
 * @FilePath: \my-vue3-h5\src\config\net.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
type NetConfigSuccessCode = 200 | '200' | '000000'
// 正式项目可以选择自己配置成需要的接口地址，如"https://api.xxx.com"
// 问号后边代表开发环境，冒号后边代表生产环境
export const baseURL: string = import.meta.env.MODE === 'development'
  ? `${import.meta.env.VITE_RES_URL}`
  : `${import.meta.env.VITE_RES_URL}/get_user`
// 配后端数据的接收方式application/json;charset=UTF-8 或 application/x-www-form-urlencoded;charset=UTF-8
export const contentType: string = 'application/json;charset=UTF-8'
// 最长请求时间
export const requestTimeout: number = 10000
// 超时尝试次数
export const timeoutNum: number = 3
// 超时重新请求间隔
export const intervalTime: number = 1000
// 操作正常code，支持String、Array、int多种类型
export const successCode: NetConfigSuccessCode[] = [200, '200', '000000']
// 数据状态的字段名称
export const statusName: string = 'code'
// 状态信息的字段名称
export const messageName: string = 'message'