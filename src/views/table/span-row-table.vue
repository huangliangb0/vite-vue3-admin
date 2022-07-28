<template>
  <page-layout>
    <template #header>
      <h3> span-row-table 页面 </h3>
    </template>
    <basic-table bordered :columns="columns" :data="data" />
  </page-layout>
</template>
<script lang="ts" setup>
  import { useSpanRowTable } from './hook/useSpanRowTable'
  const { data, columns } = useSpanRowTable()
</script>
<style lang="less"></style>
