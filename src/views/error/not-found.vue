<script lang="ts" setup></script>
<template>
  <a-result status="404" title="404" sub-title="很抱歉，此页面未找到">
    <template #extra>
      <router-link to="/">
        <a-button type="primary">返回首页</a-button>
      </router-link>
    </template>
  </a-result>
</template>
<style lang="less"></style>
