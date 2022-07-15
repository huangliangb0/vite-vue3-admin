<template>
  <a-config-provider :locale="zhCN">
    <a-layout class="app-container">
      <SlideBar
        class="app-menu-container"
        :menus="menus"
        :route="activeRoute"
        :active-top-path="activeTopPath"
        :active-path="activePath"
        :is-show-child-menu="isShowChildMenu"
      >
      </SlideBar>
      <div class="main-container">
        
        <router-view />
      </div>
    </a-layout>
  </a-config-provider>
</template>

<script lang="ts" setup>
 import zhCN from 'ant-design-vue/es/locale/zh_CN';
 import { SlideBar } from './components'
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';

import { generatePermissionRoutes } from '@/utils/routes';
import permissionRoutes from '@/router/permissionRoutes';
import MenusModel from '@/models/MenusModel';
import useRouteInfo from '@/layout/hook/useRouteInfo';
dayjs.locale('zh-cn');

const menus = generatePermissionRoutes(permissionRoutes, MenusModel)

const { activePath, activeTopPath, activeRoute, isShowChildMenu } =
        useRouteInfo(menus)

</script>

<style lang="less" scoped>
  .app-container {
    height: calc(100vh);
    overflow: hidden;
  }
  .app-menu-container {
    display: flex;
    width: auto;
    height: 100%;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    z-index: 1;
    transition: width 0.3s;
  }

  .main-container {
    flex: 1;
    background-color: #f6f8f9;
    overflow: auto;
  }
</style>
