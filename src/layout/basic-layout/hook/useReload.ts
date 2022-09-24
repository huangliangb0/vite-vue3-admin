import { ref } from 'vue'
/**
 * @description 标签栏右侧重新刷新当前页面功能，其实就是通过v-if 判断，先卸载router-view然后再显示达到一个重载的作用
 * */
export default () => {
  const isRouterAlive = ref(true)
  // 重新加载当前页面
  const reload = () => {
    isRouterAlive.value = false
    setTimeout(() => {
      isRouterAlive.value = true
    }, 10)
  }
  return {
    isRouterAlive,
    reload,
  }
}
