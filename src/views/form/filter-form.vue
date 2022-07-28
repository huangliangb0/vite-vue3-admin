<template>
  <page-layout>
    <template #header>
      <EditForm
        :schemas="schemas"
        :initialValue="initialValue"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
        @submit="handleSubmit"
      />
    </template>
  </page-layout>
</template>
<script lang="ts" setup>
  import FilterSearch from '@/components/form/FilterSearch.vue'
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
</script>
<style lang="less"></style>
