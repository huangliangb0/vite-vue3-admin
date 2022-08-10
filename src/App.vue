<script setup lang="ts">
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
  import { onMounted } from 'vue'
  import { debounce } from 'lodash'
  import elementResizeDetectorMaker from 'element-resize-detector'
  import { GridEnum } from '@/enums/app.enum'
  import { useAppStore } from './store/modules/app'
  import zhCN from 'ant-design-vue/es/locale/zh_CN'
  // 创建实例
  const erd = elementResizeDetectorMaker({
    strategy: 'scroll',
  })
  const appStore = useAppStore()
  onMounted(() => {
    erd.listenTo(
      document.body,
      debounce((element) => {
        const width = element.clientWidth
        const GridValue = [576, 768, 992, 1200, 1600, 2000]

        GridValue.some((w, index, array) => {
          if (index === 0 && width < w) {
            appStore.setWindowSize('xs')
            return true
          }
          if (index === array.length - 1 && width > w) {
            appStore.setWindowSize('xxxl')
            return true
          }
          if (width >= w && width < array[index + 1]) {
            appStore.setWindowSize(GridEnum[w] as GridKey)
            return true
          }
        })

        appStore.setWindowWidth(width)
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
