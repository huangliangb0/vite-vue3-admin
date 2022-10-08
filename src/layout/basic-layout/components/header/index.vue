<!--
 * @Description: 
 * @Date: 2022-07-19 14:17:29
 * @LastEditTime: 2022-07-19 18:34:40
 * @FilePath: \vite-vue3-admin\src\layout\basic-layout\components\header\index.vue
-->

<script lang="ts" setup>
  import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
  import { getImageUrl } from '@/assets'
  import useUserStore from '@/store/modules/user'
  import { useRoute, useRouter } from 'vue-router'
  import Breadcrumb from '../breadcrumb/index.vue'
  const avatar = getImageUrl('avatar.png')
  const props = defineProps({
    collapsed: Boolean,
  })
  const emit = defineEmits<{
    (e: 'update:collapsed', value: boolean): void
  }>()
  const route = useRoute()
  const router = useRouter()
  const userStore = useUserStore()
  const collapseClick = () => {
    emit('update:collapsed', !props.collapsed)
  }

  const logout = () => {
    userStore.logout().then(() => {
      router.push({
        path: `/login`,
        query: {
          redirect: route.path,
          ...route.query,
        },
      })
    })
  }
</script>
<template>
  <a-layout-header class="app-header">
    <a-row justify="space-between">
      <a-col>
        <a-space>
          <div class="app-sider-collapsed" @click="collapseClick">
            <menu-unfold-outlined v-if="collapsed" class="trigger" />
            <menu-fold-outlined v-else class="trigger" />
          </div>
          <Breadcrumb />
        </a-space>
      </a-col>

      <a-col class="header-right-action-box">
        <a-dropdown :trigger="['click']">
          <span class="action-item">
            <span class="avatar">
              <img :src="avatar" alt="" />
            </span>
            <span class="username">用户名</span>
          </span>
          <template #overlay>
            <a-menu>
              <a-menu-item key="0">
                <a-button type="text" @click="logout"> 退出登录 </a-button>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-col>
    </a-row>
  </a-layout-header>
</template>
<style lang="less" scoped>
  .app-header {
    // padding: 0 var(--app-margin);
    padding: 0;
    background: #fff;
    color: @text-color;
    font-size: @font-size-base;
    box-shadow: @box-shadow-base;
    height: var(--app-header-height);
    line-height: var(--app-header-height);
  }
  .app-sider-collapsed {
    cursor: pointer;
    padding: 0 12px;
  }
  .header-right-action-box {
    display: flex;
    .action-item {
      height: var(--app-header-height);
      padding: 0 12px;
      overflow: hidden;
      font-size: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      .avatar {
        width: 32px;
        height: 32px;
        font-size: 0;
        margin-right: 6px;
        img {
          width: 100%;
          height: auto;
          vertical-align: top;
        }
      }
      &:hover {
        background-color: #f0f0f0;
      }
    }
  }
</style>
