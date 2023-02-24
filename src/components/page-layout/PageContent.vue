<script lang="ts" setup>
  import { CSSProperties } from 'vue'

  defineOptions({
    name: 'PageContent',
  })

  const props = defineProps({
    backgroundColor: {
      type: String,
      default: '#fff',
    },
    minHeight: {
      type: [Number, String],
      default: 'auto',
    },
  })

  const style = computed(() => {
    let { backgroundColor, minHeight } = props

    minHeight === 'auto' ? minHeight : ~~minHeight + 'px'

    return {
      backgroundColor,
      minHeight,
    } as CSSProperties
  })
</script>

<template>
  <div class="page--layout_content" :style="style">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
  .page--layout_content {
    padding: @margin;
  }
</style>
