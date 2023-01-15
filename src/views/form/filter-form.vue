<script lang="ts" setup name="FilterForm">
  import { FilterSearch } from '@/components/form'
  import { FormSchemas } from '@/components/form/type'

  // defineOptions({
  //   name: 'FilterForm',
  // })

  const filter = ref<InstanceType<typeof FilterSearch>>()
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

<template>
  <page-layout>
    <page-content>
      <filter-search ref="filter" :schemas="schemas" @submit="handleSubmit" />
    </page-content>
  </page-layout>
</template>

<style lang="less"></style>
