<template>
  <a-row :gutter="[20, 20]">
    <a-col :span="24">
      <a-card title="项目背景">
        <p>
          曾经上git去copy别的后台管理系统，项目结构不仅繁杂，而且项目代码复杂，组件封装太深，不易阅读也不易扩展。
        </p>
        <p>
          本项目只封装常用组件（比如Table、form），只提供最基本封装的逻辑，很多东西应该根据开发者根据自己的项目需求自己扩展
        </p>
        <p> 保证项目的易阅读，易扩展 </p>
      </a-card>
    </a-col>
    <a-col :span="24">
      <a-card title="项目适配" />
    </a-col>
  </a-row>
</template>
<script lang="ts" setup></script>
<style lang="less"></style>
