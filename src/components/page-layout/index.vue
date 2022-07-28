<script lang="ts" setup>
  import { computed, StyleValue } from 'vue'

  defineOptions({
    name: 'pageLayout',
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
    } as StyleValue
  })
</script>

<template>
  <div class="page--layout" :style="style">
    <div class="page--layout_header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="page--layout_content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .page--layout {
    .page--layout_header,
    .page--layout_content {
      padding: @margin;
    }
    .page--layout_header + .page--layout_content {
      padding-top: 0;
    }
  }
</style>
