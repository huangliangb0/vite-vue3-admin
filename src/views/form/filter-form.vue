<template>
  <div class="page--container">
    <div class="page--container_header">
      <FilterSearch :schemas="schemas" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import FilterSearch from '@/components/form/FilterSearch.vue'
  import { FilterSearchSchemas } from '@/components/form/type'
  const schemas: FilterSearchSchemas = [
    {
      field: 'classLevel',
      label: '年级',
      component: 'Select',
      componentProps: () => ({
        placeholder: '请选择',
        options: [
          {
            label: '一年级',
            value: 1,
          },
          {
            label: '二年级',
            value: 2,
          },
          {
            label: '三年级',
            value: 3,
          },
        ],
      }),
    },
    {
      field: 'className',
      label: '班级',
      componentProps: () => ({
        placeholder: '请输入',
        modifier: {
          trim: true,
        },
      }),
    },
    {
      field: 'name',
      label: '学生姓名',
      componentProps: () => ({
        placeholder: '请输入',
        modifier: {
          trim: true,
        },
      }),
    },
  ]
</script>
<style lang="less"></style>
