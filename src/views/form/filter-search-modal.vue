<script lang="ts" setup>
  import { useSearchModal } from '@/hook'

  const { SearchForm } = useSearchModal({
    schemas: [
      {
        field: 'grade',
        label: '年级',
        component: 'Select',
        formItemProps: {
          rules: [{ required: true, message: '请选择年级', trigger: 'change' }],
        },
        componentProps: () => ({
          placeholder: '请选择年级',
          options: [
            {
              label: '一年级',
              value: 1,
            },
            {
              label: '二年级',
              value: 2,
            },
          ],
        }),
      },
      {
        field: 'name',
        label: '学生姓名',
        formItemProps: {},
        componentProps: () => ({
          placeholder: '请输入学生姓名',

          modifier: {
            trim: true,
          },
        }),
      },
    ],
  })
  const handleSubmit = (arg: Recordable) => {
    console.log('过滤搜索submit', arg)
  }
</script>

<template>
  <page-layout>
    <div>
      <a-card>
        <template #title>
          <h3>过滤查询</h3>
          <p
            ><strong>useSearchModal</strong>默认设置了属性<strong
              >modal={xs: true}</strong
            >,表示窗口小于576时，搜索框就变成模态框的状态</p
          >
          <p>可以根据自己的需求修改modal的状态</p>
          <p>试着把下面的屏幕拉小</p>
        </template>
        <SearchForm @submit="handleSubmit" />
      </a-card>
    </div>
  </page-layout>
</template>
