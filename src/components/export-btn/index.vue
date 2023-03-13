<script lang="ts" setup>
  import { DownloadOutlined } from '@ant-design/icons-vue'

  // import SvgIcon from '../svg-icon/svg-icon.vue';
  defineOptions({
    name: 'ExportBtn',
  })
  defineProps({
    text: {
      type: String,
      default: '导出图片',
    },
  })
</script>

<template>
  <a-button size="small" class="export-btn" v-bind="$attrs">
    <span class="icon">
      <DownloadOutlined />
    </span>
    <span class="text">{{ text }}</span>
  </a-button>
</template>

<style lang="less" scoped>
  .export-btn {
    border-color: @primary-color;
    color: @primary-color;
    font-size: 12px;
    img {
      display: inline-block;
      vertical-align: middle;
    }
    .icon {
      vertical-align: middle;
    }
    .text {
      padding-left: 4px;
      vertical-align: middle;
    }
  }
</style>
