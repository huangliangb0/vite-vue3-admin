<!--
 * @Description: 
 * @Date: 2022-07-20 09:39:07
 * @LastEditTime: 2022-07-22 17:25:54
 * @FilePath: \vite-vue3-admin\src\layout\basic-layout\components\tags-view\Dropdown.vue
-->
<script lang="ts" setup>
  import {
    SwapLeftOutlined,
    SwapRightOutlined,
    CloseOutlined,
    CloseSquareOutlined,
    RedoOutlined,
  } from '@ant-design/icons-vue'
  import { inject, PropType } from 'vue'
  const reload = inject('reload') as () => void
  defineProps({
    onClose: {
      type: Function as PropType<
        (arg: 'other' | 'left' | 'right' | 'all') => void
      >,
      required: true,
    },
  })
</script>

<template>
  <a-dropdown v-bind="$attrs">
    <slot></slot>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <a href="javascript:;" @click="reload">
            <RedoOutlined />
            重新刷新
          </a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;" @click="onClose('other')">
            <CloseOutlined />
            关闭其它
          </a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;" @click="onClose('left')">
            <SwapLeftOutlined />
            关闭左则
          </a>
        </a-menu-item>
        <a-menu-item @click="onClose('right')">
          <a href="javascript:;">
            <SwapRightOutlined />
            关闭右侧
          </a>
        </a-menu-item>
        <a-menu-item @click="onClose('all')">
          <a href="javascript:;">
            <CloseSquareOutlined />
            关闭全部
          </a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<style lang="less" scoped></style>
