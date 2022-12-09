<script lang="ts" setup>
  import { useSpanRowTable } from './hook/useSpanRowTable'
  const { data, columns } = useSpanRowTable()
</script>
<template>
  <page-layout>
    <page-header>
      <h3> span-row-table 页面 </h3>
    </page-header>
    <page-content>
      <basic-table
        bordered
        :columns="columns"
        :data="data"
        :pagination="null"
      />
    </page-content>
  </page-layout>
</template>
<style lang="less"></style>
