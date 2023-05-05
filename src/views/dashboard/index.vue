<script lang="ts" setup>
  import { BottomView, MapView, SalesView, TopView } from './components'

  defineOptions({
    name: 'Dashboard',
  })
</script>

<template>
  <page-layout>
    <pgge-content>
      <a-row :gutter="[20, 20]">
        <a-col :span="24">
          <TopView />
        </a-col>
        <a-col :span="24">
          <SalesView />
        </a-col>
        <a-col :span="24">
          <BottomView />
        </a-col>
        <a-col :span="24">
          <MapView />
        </a-col>
      </a-row>
    </pgge-content>
  </page-layout>
</template>
<style lang="less" scoped></style>
