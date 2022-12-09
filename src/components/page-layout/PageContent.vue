<script lang="ts" setup>
  defineOptions({
    name: 'PageContent',
  })
</script>

<template>
  <div class="page--layout_content">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
  .page--layout_content {
    padding: @margin;
  }
</style>
