<template>
  <a-layout class="app-container">
    <a-layout-sider
      v-if="isShowLayoutSider"
      class="app-sider"
      :collapsed="collapsed"
      :trigger="null"
      collapsible
    >
      <Title />
      <Menu
        :routes="routes"
        :inline-collapsed="collapsed"
        mode="inline"
        theme="dark"
      />
    </a-layout-sider>
    <a-drawer
      v-else
      placement="left"
      :width="200"
      :visible="collapsed"
      @close="collapsed = false"
      :headerStyle="{ display: 'none' }"
      :bodyStyle="{ padding: 0 }"
    >
      <Menu style="height: 100%" :routes="routes" mode="inline" theme="dark" />
    </a-drawer>

    <a-layout theme="light">
      <Header v-model:collapsed="collapsed" />
      <TagsView />
      <a-layout-content class="app-content">
        <View :is-router-alive="isRouterAlive" />
      </a-layout-content>
      <!-- <a-layout-footer>Footer</a-layout-footer> -->
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
  import { computed, provide, ref } from 'vue'
  import zhCN from 'ant-design-vue/es/locale/zh_CN'
  import { Menu, Header, Title, View, TagsView } from './components'
  import dayjs from 'dayjs'
  import 'dayjs/locale/zh-cn'
  import { generatePermissionRoutes } from '@/utils/routes'
  import permissionRoutes from '@/router/permissionRoutes'
  import { useReload, useShowLayoutSider } from './hook'
  import useMenuStore from '@/store/modules/menu'
  dayjs.locale('zh-cn')

  const munusStore = useMenuStore()

  const routes = computed(() =>
    generatePermissionRoutes(permissionRoutes, munusStore.menusTree),
  )

  const collapsed = ref(false)

  // 是否显示侧边栏
  const isShowLayoutSider = useShowLayoutSider()

  // 是否刷新页面
  const { isRouterAlive, reload } = useReload()

  provide('reload', reload)
</script>

<style lang="less" scoped>
  .app-container {
    height: calc(100vh);
    overflow: hidden;
  }
  .app-sider {
    height: 100%;
    overflow-y: auto;
  }

  .app-content {
    padding: @margin;
    flex: 1;
    background-color: #f6f8f9;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
