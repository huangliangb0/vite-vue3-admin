<template>
  <page-layout>
    <page-header>
      <h3> 普通表格 </h3>
    </page-header>
    <page-content>
      <Table :pagination="pagination" />
    </page-content>
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
