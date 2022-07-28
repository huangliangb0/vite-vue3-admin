<template>
  <page-layout>
    <template #header>
      <filter-search :schemas="schemas" @submit="handleSubmit" />
    </template>
  </page-layout>
</template>
<script lang="ts" setup>
  import { FormSchemas } from '@/components/form/type'
  const schemas: FormSchemas = [
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
  const handleSubmit = (arg: Recordable) => {
    console.log('搜索参数', arg)
  }
</script>
<style lang="less"></style>
