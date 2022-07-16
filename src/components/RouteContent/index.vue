<script lang="ts">
  // 声明额外的选项

  import { isExternal } from '@/utils/validate'
  import { useRouter } from 'vue-router'

  export default {
    name: 'RouteContent',
  }
</script>

<script lang="ts" setup>
  defineProps({
    icon: String,
    title: String,
    path: String,
  })

  const router = useRouter()

  const jump = (path: string | undefined) => {
    if (!path) {
      return
    }
    if (isExternal(path)) {
      window.open(path, '_blank')
    } else {
      router.push(path)
    }
  }
</script>
<template>
  <p class="route-content" @click="jump(path)">
    <!-- <span class="route-icon" v-if="icon">
      <svg-icon :icon="icon"></svg-icon>
    </span> -->
    <span class="route-name">
      {{ title }}
    </span>
    <slot></slot>
  </p>
</template>

<style lang="less" scoped>
  .route-content {
    position: relative;
    font-size: 0;
    span {
      vertical-align: middle;
    }
    .route-icon {
      padding-right: 4px;
      font-size: 14px;
      vertical-align: middle;
      position: relative;
      top: -1px;
    }
    .route-name {
      font-size: 14px;
      vertical-align: middle;
    }
  }
</style>
