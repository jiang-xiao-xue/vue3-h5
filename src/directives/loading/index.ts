/*
 * @Author: jiangxx 18635949970@163.com
 * @Date: 2022-07-15 17:32:24
 * @LastEditors: jiangxx 18635949970@163.com
 * @LastEditTime: 2022-07-18 16:46:21
 * @FilePath: \my-vue3-h5\src\directives\loading\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 全局加载组件
const handleMove = (e: TouchEvent) => {
  e.preventDefault()
}

export default {
  beforeMount(el: HTMLElement, binding: any) {},
  mounted() {},
  beforeUpdate() {}, // 新
  updated(el: HTMLElement, binding: any) { // 更新的时候用这个
    if (binding.value) {
      /**
       * binding.value就是v-loading='true'传过来的那个值
       * 如果传过来的值为true 你们就是要展示loading
       * el是当前指令绑定的对象 binding是传过来的值
       */

      // 在移动端页面禁用滚动
      document.body.addEventListener('touchmove', handleMove, { passive: false })

      // 判断当前页面是否存在没有消失的loading
      // hasLoading 值为false 时表明没有loading 可以添加loading
      const hasLoading = el.getElementsByClassName('jxx-loading').length !== 0
      if (hasLoading) return '已经存在loading...'

      // 判断是否传入了自定义提示文字
      const hasCustomText = el.getAttribute('jxx-loading-text')

      // 判断是否传入了自定义背景色
      const hasCustomBgColor = el.getAttribute('jxx-loading-background')

      el.style.position = 'relative'
      const mask = document.createElement('div') // 创建最外层div 高度占满（包含滚动）
      const loadingBox = document.createElement('div') // 显示loading的div 高度是100vh
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg') // svg标签 用来实现旋转的圆
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle') // 旋转的那个圆
      const text = document.createElement('p') // 加载的文字
	  
      
      mask.setAttribute('class', 'jxx-loading')
      mask.style.background = !hasCustomBgColor ? 'rgba(255, 255, 255, .8)' : hasCustomBgColor
      loadingBox.setAttribute('class', 'jxx-loading-box')
      svg.setAttribute('class', 'jxx-loading_circular refleash')
      svg.setAttribute('viewBox', '25 25 50 50')
      circle.setAttribute('cx', '50')
      circle.setAttribute('cy', '50')
      circle.setAttribute('r', '20')
      circle.setAttribute('fill', 'none')
      text.innerText = !hasCustomText ? '加载中' : hasCustomText

      svg.appendChild(circle)
      loadingBox.appendChild(svg)
      loadingBox.appendChild(text)
      mask.appendChild(loadingBox)
      el.appendChild(mask)
    } else {
      /**
       * 传过来的值为false 不需要展示loading
       * 移除loading相关dom
       */
      for (let i = 0; i < el.childNodes.length; i++) {
        if ((el.childNodes[i] as any).className === 'jxx-loading') {
          const childNodes = el.getElementsByClassName('jxx-loading')[0]
          el.removeChild(childNodes)
          break
        }
      }

      // 弹窗消失时移除'禁用滑动事件'
      document.body.removeEventListener('touchmove', handleMove)
    }
  },
  beforeUnmount() {}, // 新
  unmounted() {}
}
