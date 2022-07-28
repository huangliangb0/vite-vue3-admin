<script lang="ts" setup>
  import { EditForm } from '@/components/form'
  import { FormSchemas } from '@/components/form/type'
  import { onMounted, reactive } from 'vue'
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
      type: 'array',
      field: 'info',
      label: '学生信息',
      valueFormat: {
        name: '',
        sex: undefined,
      },
      schemas: [
        {
          field: 'name',
          label: '姓名',
          componentProps: () => ({
            placeholder: '请输入',
            modifier: {
              trim: true,
            },
          }),
        },
        {
          field: 'sex',
          label: '性别',
          component: 'Select',
          componentProps: () => ({
            placeholder: '请选择',
            options: [
              {
                label: '男',
                value: 1,
              },
              {
                label: '女',
                value: 0,
              },
            ],
          }),
        },
      ],
    },
    {
      type: 'array',
      field: 'info2',
      label: '学生信息',
    },
  ]
  const initialValue = reactive<{
    classLevel: number | undefined
    className: string
    info: any[]
    info2: any[]
  }>({
    classLevel: undefined,
    className: '',
    info: [],
    info2: [],
  })
  const handleSubmit = (e: any) => {
    console.log('handleSubmit', e)
  }
  onMounted(() => {
    setTimeout(() => {
      initialValue.info2 = ['波仔', '小花']
      initialValue.classLevel = 1
    }, 1000)
  })
</script>
<template>
  <page-layout>
    <EditForm
      :schemas="schemas"
      :initialValue="initialValue"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
      @submit="handleSubmit"
    />
  </page-layout>
</template>
<style lang="less"></style>
