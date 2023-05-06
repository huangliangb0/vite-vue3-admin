<script lang="ts" setup>
  defineProps({
    title: String,
  })
</script>

<template>
  <div class="section-box">
    <h3 class="section-title" v-if="title">{{ title }}</h3>
    <div class="section-content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .section-box {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    .section-title {
      width: 100%;
      font-size: 12px;
      color: #666;
      font-weight: 500;
      line-height: 1;
      margin-bottom: @margin;
    }
    .section-content {
      flex: 1;
      width: 100%;
    }
  }
</style>
