/*
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-06-28 16:07:51
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-09-09 17:38:41
 * @FilePath: \my-vue3-h5\src\utils\request.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios, { AxiosResponse, AxiosRequestConfig, CancelTokenStatic, AxiosInstance } from 'axios';
import {
  baseURL,
  successCode,
  contentType,
  requestTimeout,
  statusName,
  messageName
} from '@/config/net.config'
import qs from 'qs'
import getUrl from '@/api'

const CODE_MESSAGE: any = {
  200: '服务器成功返回请求数据',
  201: '新建或修改数据成功',
  202: '一个请求已经进入后台排队(异步任务)',
  204: '删除数据成功',
  400: '发出信息有误',
  401: '用户没有权限(令牌失效、用户名、密码错误、登录过期)',
  402: '前端无痛刷新token',
  403: '用户得到授权，但是访问是被禁止的',
  404: '访问资源不存在',
  406: '请求格式不可得',
  410: '请求资源被永久删除，且不会被看到',
  500: '服务器发生错误',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
}

class MyRequest {
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  protected service: AxiosInstance = axios
  protected pending: Array<{ url: string, cancel: Function }> = []
  protected CancelToken: CancelTokenStatic = axios.CancelToken
  protected axiosRequestConfig: AxiosRequestConfig = {}
  private static _instance: MyRequest;

  constructor () {
    this.requestConfig()
    this.service = axios.create(this.axiosRequestConfig)
    this.interceptorsRequest()
    this.interceptorsResponse()
  }

  /**
     * 初始化配置
     * @protected
     */
  protected requestConfig (): void {
    this.axiosRequestConfig = {
      // 前端解决跨域时需要屏蔽此代码
      baseURL: baseURL,
      headers: {
        timestamp: new Date().getTime(),
        'Content-Type': contentType,
      },
      // transformRequest: [obj => qs.stringify(obj)],
      transformResponse: [function (data: AxiosResponse) {
        return data
      }],
      paramsSerializer: function (params: any) {
        return qs.stringify(params, { arrayFormat: 'brackets' })
      },
      timeout: requestTimeout,
      withCredentials: false,
      responseType: 'json',
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      maxRedirects: 5,
      maxContentLength: 2000,
      validateStatus: function (status: number) {
        return status >= 200 && status < 500
      }
      // httpAgent: new http.Agent({keepAlive: true}),
      // httpsAgent: new https.Agent({keepAlive: true})
    }
  }

  /**
   * 请求拦截
   * @protected
   */
  protected interceptorsRequest (): void {
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig ) => {
        let token = window.localStorage.getItem('authorization');
        token = eval('(' + token + ')');
        // 遇到问题config.headers可能未定义，三种解决办法：
        // 1、 降低axios版本；2、增加一步对headers的判断；3、进行类型覆盖；
        // 这里选择第二种方式
        if ( token && config && config.headers) {
          config.headers.authorization = token;
          console.log(config.headers)
        }
        const keyOfRequest = this.getKeyOfRequest(config)
        this.removePending(keyOfRequest, true)
        config.cancelToken = new this.CancelToken((c: any) => {
          this.pending.push({
            url: keyOfRequest,
            cancel: c
          })
        })
        this.requestLog(config)
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

    /**
     * 响应拦截
     * @protected
     */
  protected interceptorsResponse (): void {
      this.service.interceptors.response.use((response: AxiosResponse) => {
      return this.handleResponse(response)
    }, error => {
      const { response } = error
      if (response === undefined) {
        return Promise.reject(new Error(error))
      } else {
        return this.handleResponse(response)
      }
    })
  }

  protected handleResponse (response: AxiosResponse): Promise<AxiosResponse<any>> {
    this.responseLog(response)
    this.removePending(this.getKeyOfRequest(response.config))
    const { data, status, config, statusText } = response;
    
    let code = data && data[statusName]
      ? data[statusName]
      : status
    if (successCode.indexOf(data[statusName]) + 1) code = 200
    switch (code) {
      case 200:
        return Promise.resolve(response)
      case 401:
        // TODO token失效,跳转登录页
        break
      case 403:
        // TODO 没有权限,跳转403页面
        break
    }
    // 异常处理
    const errMsg = data && data[messageName]
      ? data[messageName]
      : CODE_MESSAGE[code]
        ? CODE_MESSAGE[code]
        : statusText
    return Promise.reject(errMsg)
  }

    /**
     * 取消重复请求
     * @protected
     * @param key
     * @param request
     */
  protected removePending (key: string, request: boolean = false): void {
    this.pending.some((item, index) => {
      if (item.url === key) {
        if (request) console.log('=====  取消重复请求  =====', item)
        item.cancel()
        this.pending.splice(index, 1)
        return true
      }
      return false
    })
  }

    /**
     * 获取请求配置拼装的key
     * @param config
     * @protected
     */
  protected getKeyOfRequest (config: AxiosRequestConfig): string {
    let key = config.url
    if (config.params) key += JSON.stringify(config.params)
    if (config.data) key += JSON.stringify(config.data)
    key += `&request_type=${config.method}`
    return key as string
  }

    /**
     * 请求日志
     * @param config
     * @protected
     */
  protected requestLog (config: any): void {
  }

  /**
     * 响应日志
     * @protected
     * @param response
     */
  protected responseLog (response: AxiosResponse) {
    if (import.meta.env.MODE === 'development') {
      const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(
        Math.random() * 255
      )},${Math.round(Math.random() * 255)})`
      console.log(
        '%c┍------------------------------------------------------------------┑',
        `color:${randomColor};`
      )
      console.log('| 请求地址：', response.config.url)
      console.log('| 请求参数：', qs.parse(response.config.data))
      console.log('| 返回数据：', response.data)
      console.log(
        '%c┕------------------------------------------------------------------┙',
        `color:${randomColor};`
      )
    }
  }

  /**
     * post方法
     * @param url
     * @param data
     * @param config
     */
  public post (url: string, data: any = {}, config: object = {}): Promise<MyRequest.response> {
    return new Promise((resolve, reject) => {
      this.service.post(getUrl(url), data, config).then((result: any) => {
        result = JSON.parse(result.data);
        resolve({
          msg: result.message,
          data: result.data,
          code: result.code
        })
      }, reject)
    })
  }

  /**
     * get方法
     * @param url
     * @param params
     * @param config
     */
  public get (url: string, params: any = {}, config: object = {}): Promise<MyRequest.response> {
    return new Promise((resolve, reject) => {
      this.service.get(`${getUrl(url)}?${qs.stringify(params)}`, config).then((result: any) => {
        result = JSON.parse(result.data);
        resolve({
          msg: result.message,
          data: result.data,
          code: result.code
        })
      }, reject)
    })
  }

  /**
     * put方法
     * @param url
     * @param params
     * @param config
     */
   public put (url: string, data: any = {}, config: object = {}): Promise<MyRequest.response> {
    return new Promise((resolve, reject) => {
      this.service.put(getUrl(url), data, config).then((result: any) => {
        result = JSON.parse(result.data);
        resolve({
          msg: result.message,
          data: result.data,
          code: result.code
        })
      }, reject)
    })
  }
  /**
     * delete方法
     * @param url
     * @param params
     * @param config
     */
   public delete (url: string, params: any = {}, config: object = {}): Promise<MyRequest.response> {
    return new Promise((resolve, reject) => {
      this.service.delete(`${getUrl(url)}?${qs.stringify(params)}`, config).then((result: any) => {
        result = JSON.parse(result.data);
        resolve({
          msg: result.message,
          data: result.data,
          code: result.code
        })
      }, reject)
    })
  }
  /**
     * 创建唯一实例（单例模式）
     */
  public static getInstance (): MyRequest {
    // 如果 instance 是一个实例 直接返回，  如果不是 实例化后返回
    this._instance || (this._instance = new MyRequest())
    return this._instance
  }
}
export default MyRequest.getInstance();




// //组件中使用
// this.$request.post('common.token', {})
// this.$request.get('common.token', {})
// //ts文件中使用
// import request from '@/utils/request'
// request.post('common.token', {})
// request.get('common.token', {})
