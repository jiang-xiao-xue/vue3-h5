<!--
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-07-15 16:37:03
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-07-22 11:18:14
 * @FilePath: \my-vue3-h5\src\components\toast\README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
### 使用
```
const { ctx } = getCurrentInstance();
const that = ctx.$.appContext.config.globalProperties;
that.$toast({
    value: 'toast',
    duration: 0, // 如果大于0则不必使用destory方法
    background: '#000',
    color: '#fff'
})
setTimeout(() => {
  that.$toast.destory && that.$toast.destory() ///销毁
}, 2000)
```
前面铺垫：react hooks 相对于 vue hooks不足，以及是react hooks先提出的想法，但useEffect的使用不是那么的友好，他们也在考虑改进
新想法：编译模式可选择 不止虚拟dom 新（还在执行阶段测试中）： 实现创建静态页面，再注入静态结合响应式进行编译（不会存在破坏性更新）；
构建：例如基于cli脚手架创建的项目 如果需要自定义的东西与脚手架自定义的东西相互冲突那么改起来会很痛苦；
      例如webpack 则是专注于打包，需要引入很多插件，比较麻烦；
      例如vite则是 cli层面专注于应用，抽象高；API则支持上层框架抽象层（不怎么用到）
js全栈： vite press 利用shell + parlial hydration(可了解)