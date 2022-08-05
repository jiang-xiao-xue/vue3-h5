/*
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-06-22 10:16:01
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-08-05 17:01:09
 * @FilePath: \my-vue3-h5\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */



import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
export default({ command, mode }) => {
  return defineConfig({
    plugins: [
      vue(),
      vueJsx()
    ],
    resolve: {
      alias: {
        '@': resolve('./src')
      }
    },
    server: {
      // port: 4000, // 服务端口号
      port: Number(loadEnv(mode, process.cwd()).VITE_APP_PORT),
      open: true, // 服务启动时是否自动打开浏览器
      // cors: true, // 允许跨域
      hmr: {
        overlay: false, // 屏蔽服务器报错
      },
      // proxy: {
      //   '/get_user': {
      //     target: 'http://localhost:9785',
      //     changeOrigin: true
      //   },
      // } // 代理
      // host: "127.0.0.1",
      // port: Number(loadEnv(mode, process.cwd()).VITE_APP_PORT),
      // strictPort: true, // 端口被占用直接退出
      // https: false,
      // open: false, // 在开发服务器启动时自动在浏览器中打开应用程序
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        // 引入 var.scss 这样就可以在全局中使用 var.scss中预定义的变量了
        // 给导入的路径最后加上 ;
        scss: {
          additionalData: '@import "@/assets/styles/global.scss";',
        },
      },
    },
    build: {
      chunkSizeWarningLimit: 1500, // 分块打包，分解块，将大块分解成更小的块
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
            }
          }
        }
      }
    }

  })
}

