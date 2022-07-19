/*
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-06-28 15:55:04
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-06-28 15:57:15
 * @FilePath: \my-vue3-h5\src\api\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import common from '@/api/common'

interface UrlDict {
  [key: string]: {
    [key: string]: string
  }
}

const urlDict: UrlDict = {
  common
}

const getUrl = (url: string): string => {
  try {
    if (url === '') throw new Error('请求路径为空')
    const [modelName, urlName] = url.split('.');
    if (!Object.keys(urlDict).includes(modelName)) throw new Error('未获取到请求模块');
    const reqUrl = urlDict[modelName][urlName];;
    if (!reqUrl) throw new Error('未获取到请求所需url')
    return reqUrl;
  } catch (e) {
    console.error(e);
    return '';
  }
}

export default getUrl;