<!--
 * @Description: 
 * @Date: 2022-07-20 09:09:38
 * @LastEditTime: 2022-07-20 09:36:13
 * @FilePath: \vite-vue3-admin\src\layout\basic-layout\index.vue
-->
<template>
  <a-config-provider :locale="zhCN">
    <a-layout class="app-container">
      <a-layout-sider
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
      <a-layout theme="light">
        <Header v-model:collapsed="collapsed" />
        <TagsView />
        <a-layout-content class="app-content">
          <View :is-router-alive="isRouterAlive" />
        </a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>

<script lang="ts" setup>
  import { provide, ref } from 'vue'
  import zhCN from 'ant-design-vue/es/locale/zh_CN'
  import { Menu, Header, Title, View, TagsView } from './components'
  import dayjs from 'dayjs'
  import 'dayjs/locale/zh-cn'
  import { generatePermissionRoutes } from '@/utils/routes'
  import permissionRoutes from '@/router/permissionRoutes'
  import MenusModel from '@/models/MenusModel'
  dayjs.locale('zh-cn')

  const routes = generatePermissionRoutes(permissionRoutes, MenusModel)
  const collapsed = ref(false)
  const isRouterAlive = ref(true)
  const reload = () => {
    isRouterAlive.value = false
    setTimeout(() => {
      isRouterAlive.value = true
    }, 10)
  }

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
    flex: 1;
    background-color: #f6f8f9;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
