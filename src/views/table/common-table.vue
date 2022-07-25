<template>
  <div class="page--container">
    <div class="page--container_header">
      <h3> 普通表格 </h3>
    </div>
    <div class="page--container_content">
      <basic-table :columns="columns" :data="data" :pagination="pagination" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue'

  const pagination = reactive<PaginationType>({
    pageSize: 10,
    current: 1,
    total: 100,
  })
  const columns = [
    {
      title: '年级',
      dataIndex: 'grade',
      ellipsis: true,
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
    },
    {
      title: '班级',
      dataIndex: 'class',
      ellipsis: true,
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
    },
    {
      title: '姓名',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      ellipsis: true,
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
</script>
<style lang="less"></style>
