<script lang="ts" setup>
  defineOptions({
    name: 'PageHeader',
  })
  const props = defineProps({
    border: {
      type: Boolean,
      default: true,
    },
  })

  const cls = computed(() => {
    const cls = ['page--layout_header']
    if (props.border) {
      cls.push('border')
    }
    return cls
  })
</script>

<template>
  <div :class="cls">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
  .page--layout_header {
    padding: @margin @margin 0 @margin;
    position: relative;
    background-color: #fff;
    &.border {
      padding-bottom: @margin;
      &::after {
        content: '';
        display: inline-block;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        border-bottom: 1px solid #f0f0f0;
      }
    }
  }
</style>
