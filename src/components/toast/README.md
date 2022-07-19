<!--
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-07-15 16:37:03
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-07-15 16:38:38
 * @FilePath: \my-vue3-h5\src\components\toast\README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
### 使用
```

this.$toast({
    value: 'toast',
    duration: 0, // 如果大于0则不必使用destory方法
    background: '#000',
    color: '#fff'
})
setTimeout(() => {
  this.$toast.destory && this.$toast.destory() ///销毁
}, 2000)
```
