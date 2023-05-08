<script lang="ts" setup>
  defineOptions({
    name: 'StaticBox',
  })
  defineProps({
    title: String,
    value: [Number, String],
  })
</script>

<template>
  <div class="static-box">
    <p class="static-title">{{ title }}</p>
    <p class="static-value">{{ value }}</p>
    <div class="static-chart-wrapper">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .static-box {
    p {
      margin: 0;
    }
    .static-title {
      font-size: 12px;
      color: #999;
    }
    .static-value {
      font-size: 25px;
      color: #000;
      margin-top: 5px;
    }
    .static-chart-wrapper {
      height: 50px;
    }
  }
</style>
