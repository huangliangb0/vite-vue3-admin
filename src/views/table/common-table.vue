<template>
  <page-layout>
    <template #header>
      <h3> 普通表格 </h3>
    </template>
    <Table :pagination="pagination" />
  </page-layout>
</template>
<script lang="tsx" setup>
  import { reactive } from 'vue'
  import useCommonTable from './hook/useCommonTable'

  const pagination = reactive<PaginationType>({
    pageSize: 10,
    current: 1,
    total: 100,
  })

  const Table = useCommonTable()
</script>
<style lang="less"></style>
