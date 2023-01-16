<script lang="tsx" setup>
  import useCommonTable from './hook/useCommonTable'

  const pagination = reactive<PaginationType>({
    pageSize: 10,
    current: 1,
    total: 100,
  })

  const Table = useCommonTable()
</script>
<template>
  <page-layout>
    <page-header border="fdsf">
      <div>
        <h3> 普通表格 </h3>
      </div>
    </page-header>
    <page-content>
      <Table :pagination="pagination" />
    </page-content>
  </page-layout>
</template>
<style lang="less"></style>
