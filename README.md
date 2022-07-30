<!--
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-06-22 10:16:01
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-07-29 14:42:15
 * @FilePath: \my-vue3-h5\README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

### 遇到的问题

- ts 不支持字符串上的某些ES6方法 例如includes 需要在tsconfig.json中配置lib

- 报错 vite TS “找不到名称 \“process\“。是否需要为节点安装类型定义? 请尝试使用 `npm i @types/node`

  解决：`yarn add @types/node` 在`vite.config.js`中配置`"types": ["node"]`
  
- 文件`.d.ts`为类型配置文件

- setup语法糖中不能使用this如果想要获取到实例上的方法

```
  const { ctx } = getCurrentInstance();
  const that = ctx.$.appContext.config.globalProperties;
```

- 跨域不用设置baseurl;

### 零碎知识点

- token 放在cookie中会引起CSRF攻击；

- CSRF攻击的本质是应用了cookie在表单提交与标签src会自动携带的特点。请求拦截是针对axios发起的请求，CSRF攻击不通过XHHR请求发起，
  所以拦截修改请求头是没有用的，token放在cookie中不安全等同于公开，如果想放入cookie中需要设置samesite属性。

- 需要进行转义过滤预防xss注入