import { App } from 'vue'

const install = (app: App) => {
  // 引入全局插件
  const plugins = import.meta.globEager('./*.ts')
  for (const path in plugins) {
    app.use(plugins[path].default)
  }
}
export default install;