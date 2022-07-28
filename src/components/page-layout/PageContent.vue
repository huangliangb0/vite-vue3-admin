<script lang="ts" setup>
  defineOptions({
    name: 'PageContent',
  })
</script>

<template>
  <div class="page--content">
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
  .page--content {
    padding: @margin;
  }
</style>
<style lang="less">
  .page--header + .page--content {
    padding-top: 0;
  }
</style>
