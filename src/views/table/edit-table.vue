<script lang="tsx" setup>
  import { TableColumns, EditTable } from '@/components/basic-table'
  import { reactive } from 'vue'

  const pagination = reactive<PaginationType>({
    pageSize: 10,
    current: 1,
    total: 100,
  })
  const columns: TableColumns = [
    {
      title: '年级',
      dataIndex: 'grade',
      ellipsis: true,
      isEdit: true,
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
      widgetProps: {
        component: 'Select',
      },
    },
    {
      title: '班级',
      dataIndex: 'class',
      ellipsis: true,
      isEdit: true,
      options: [
        {
          label: '一班',
          value: 1,
        },
        {
          label: '二班',
          value: 2,
        },
        {
          label: '三班',
          value: 3,
        },
        {
          label: '四班',
          value: 4,
        },
      ],
      widgetProps: {
        component: 'Select',
      },
    },
    {
      title: '姓名',
      dataIndex: 'name',
      ellipsis: true,
      isEdit: true,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      ellipsis: true,
      isEdit: true,
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
      widgetProps: {
        component: 'Select',
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      hideInEdit: true,
      slot: () => <a-button type="link">查看详情</a-button>,
    },
  ]
  const data = [
    {
      grade: 1,
      class: 1,
      name: '小花',
      sex: 0,
    },
    {
      grade: 2,
      class: 1,
      name: '小丽',
      sex: 0,
    },
    {
      grade: 3,
      class: 4,
      name: '小明',
      sex: 1,
    },
  ]

  const handleFinish = (v: any) => {
    console.log('edit-table finish', v)
  }
</script>
<template>
  <div class="page--container">
    <edit-table
      :columns="columns"
      :data="data"
      :pagination="pagination"
      @finish="handleFinish"
    >
      <template #header>
        <h3 style="margin: 0"> 可编辑表格 </h3>
      </template>
    </edit-table>
  </div>
</template>
<style lang="less"></style>
