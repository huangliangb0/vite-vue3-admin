<script setup lang="ts">
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
  import { onMounted } from 'vue'
  import { debounce } from 'lodash-es'
  import elementResizeDetectorMaker from 'element-resize-detector'
  import useAppStore from './store/modules/app'
  import zhCN from 'ant-design-vue/es/locale/zh_CN'
  import { GRID } from './constant/app'
  // 创建实例
  const erd = elementResizeDetectorMaker({
    strategy: 'scroll',
  })
  const appStore = useAppStore()
  onMounted(() => {
    erd.listenTo(
      document.body,
      debounce((element) => {
        const width = element.clientWidth as number

        const entries = Object.entries(GRID)
        entries.some(([k, v], index, array) => {
          const [_next_k, next_v] = array[index + 1]
          if (width >= v && width < next_v) {
            appStore.setBreakpoint(k as GridKeyType)
            appStore.setWindowWidth(width)
            return true
          }
        })
      }, 30),
    )
  })
</script>

<template>
  <a-config-provider :locale="zhCN" componentSize="middle">
    <router-view />
  </a-config-provider>
</template>

<style></style>
