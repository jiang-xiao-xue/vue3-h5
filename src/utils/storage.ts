/*
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-08-29 10:16:42
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-09-06 16:16:29
 * @FilePath: \vue3-h5\src\utils\storage.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 枚举回顾：
// 定义一些带名字的常量，支持基于数字和字符串的枚举 -
enum StorageType {
  l = 'localStorage',
  s = 'sessionStorage'
}
interface IStorageItem {
  value: any,
  expires?: number // 可选属性-
}

class MyStorage {
  storage: Storage

  constructor(type: StorageType) {
    this.storage = type === StorageType.l ? window.localStorage : window.sessionStorage;
  }
  // 过期时间得类型可以是布尔类型也可以是数字类型，布尔默认为false，设置为true默认为1年 传number类型具体数值则为具体时间
  set(key: string, value: any, expires: boolean | number = false) {
    const source: IStorageItem = { value: null};
    // 设置过期时间默认为一年
    if (expires) {
      source.expires = new Date().getTime() + (expires === true ? 1000 * 60 * 60 * 24 * 365 : expires)
    }
    source.value = value;
    const data = JSON.stringify(source);
    this.storage.setItem(key, data);
  }

  get(key: string) {
    const value = this.storage.getItem(key);
    if (value) {
      const source: IStorageItem = JSON.parse(value);
      const expires = source.expires;
      const now = new Date().getTime();
      // expires与当前时间做对比，如果当前时间大于expires，则说明已经过期，此时需要清除数据记录并返回null
      if (expires && now > expires) {
        this.delete(key)
        return null;
      }
      return source.value;
    }
  }

  delete(key: string) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }
}

const LStorage = new MyStorage(StorageType.l)
const SStorage = new MyStorage(StorageType.s)

export {LStorage, SStorage}