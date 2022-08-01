/*
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-08-01 13:54:47
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-08-01 17:51:45
 * @FilePath: \vue3-h5\src\directives\authBtn\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

interface DAMNU_ENABLE {
  [key: string]: Object
};
interface DAMNU_ENABLES {
  [key: string]: Boolean
};
// 模拟后台传入的按钮鉴权
let permisson: DAMNU_ENABLE = {
  user: {tests: false, test1: true},
  other: {other: true, other1: false}
};
let btnFlag: Boolean;
export default {
  
  created() {},
  beforeMount(el: HTMLElement, binding: any) {
    // console.log(binding.value);
    let str = binding.value;
    let pre = str.match(/(\S*)-/)[1];
    let nex: string = str.match(/-(\S*)/)[1];
    // console.log(pre, nex);
    // console.log(str.indexOf('-'));
    if (str.indexOf('-') == -1 || pre.indexOf('-') > -1) {
      console.error('请正确填写按钮鉴权格式')
    } else {
      // for (const key in permisson) {
      //   if (Object.hasOwnProperty.call(permisson, key)) {
      //     // 当对一个对象做了一个for…in循环，通过每一个key取相应的value值时，ts 会报错（编辑器内）
      //     // 原因是因为key值得类型不是string，在js中是默认转好的，所以我们需要在interface中对其进行声明
      //     let exc = permisson[pre];
      //     console.log(exc);
      //   }
      // }
      let a = permisson[pre];
      for (const key in a) {
        if (Object.hasOwn(a, key)) {
          // console.log(nex, key, 111)
          if (nex == key) {
            btnFlag = a[key];
            // console.log(btnFlag)
          } else {
            // 当只有前端设置鉴权时，默认为按钮无权限
            btnFlag = false;
          }
        }
      }

      if (!btnFlag) {
        // console.log(el)
        el.setAttribute('class', 'un-auth');
      }
    }
  },
  mounted() {},
  beforeUpdate() {},
  updated(el: HTMLElement, binding: any){}
}