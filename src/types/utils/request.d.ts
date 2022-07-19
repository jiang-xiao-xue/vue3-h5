/*
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-06-28 16:13:06
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-07-07 17:20:28
 * @FilePath: \my-vue3-h5\src\utils\request.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
declare namespace MyRequest {
  interface response {
    code: number | string,
    msg: string,
    data: any
  }
  class request {
    /**
       * POST方法
       * @param url 请求路径，模式：[模块名称.接口名称] 如 common.user
       * @param data 请求参数
       * @param config 请求配置
       */
    public post(url: string, data?: any, config?: object): Promise<response>

      /**
       * get方法
       * @param url 请求路径，模式：[模块名称.接口名称]
       * @param params 请求参数
       * @param config 请求配置
       */
    public get(url: string, params?: any, config?: object): Promise<response>

      /**
       * PUT方法
       * @param url 请求路径，模式：[模块名称.接口名称] 如 common.user
       * @param data 请求参数
       * @param config 请求配置
       */
    public put(url: string, data?: any, config?: object): Promise<response>

    /**
       * delete方法
       * @param url 请求路径，模式：[模块名称.接口名称]
       * @param params 请求参数
       * @param config 请求配置
       */
     public delete(url: string, params?: any, config?: object): Promise<response>

  }
}