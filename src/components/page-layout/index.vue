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
    <slot></slot>
  </div>
</template>
