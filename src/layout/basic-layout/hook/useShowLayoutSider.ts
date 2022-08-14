import { GRID } from '@/constant/app'
import { useAppStore } from '@/store/modules/app'
import { computed } from 'vue'
/**
 * @description 标签栏右侧重新刷新当前页面功能，其实就是通过v-if 判断，先卸载router-view然后在显示达到一个重载的作用
 * */
export default () => {
  const appStore = useAppStore()
  const windowWidth = computed(() => appStore.windowWidth)
  const isShowLayoutSider = computed(() => {
    return windowWidth.value >= GRID.md
  })

  return isShowLayoutSider
}
