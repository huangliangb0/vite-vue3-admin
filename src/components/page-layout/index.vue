<script lang="ts" setup>
  import { computed, CSSProperties } from 'vue'

  defineOptions({
    name: 'pageLayout',
  })
  const props = defineProps({
    minHeight: {
      type: [Number, String],
      default: 'auto',
    },
  })

  const style = computed(() => {
    let { minHeight } = props

    minHeight === 'auto' ? minHeight : ~~minHeight + 'px'

    return {
      minHeight,
    } as CSSProperties
  })
</script>

<template>
  <div class="page--layout" :style="style">
    <slot></slot>
  </div>
</template>
