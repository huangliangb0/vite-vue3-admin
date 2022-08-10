<script lang="ts" setup>
  import { EditFormInstance } from '@/components/form'
  import { useFormModal } from '@/hook/modal'
  const { FormModal, visible, openModal } = useFormModal({
    schemas: [
      {
        field: 'grade',
        label: '年级',
        component: 'Select',
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
        field: 'class',
        label: '班级',
        component: 'Select',
        componentProps: () => ({
          placeholder: '请选择班级',
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
              label: '三年级',
              value: 3,
            },
          ],
        }),
      },
      {
        field: 'name',
        label: '学生姓名',
        componentProps: () => ({
          placeholder: '请输入学生姓名',

          modifier: {
            trim: true,
          },
        }),
      },

      {
        type: 'array',
        field: 'linkman',
        label: '联系人',
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
            }),
          },
          {
            field: 'relationship',
            label: '关系',
            componentProps: () => ({
              placeholder: '请输入',
            }),
          },
        ],
      },
      {
        type: 'array',
        field: 'specialty',
        label: '特长',
        componentProps: () => ({
          placeholder: '请输入',
        }),
      },
    ],
  })
  const handleOk = (arg: any) => {
    console.log(arg)
  }
  const getFormInstance = (instance: EditFormInstance) => {
    console.log('获取 edit-form 组件实例', instance)
  }
</script>

<template>
  <div>
    <a-button @click="openModal">添加</a-button>
    <a-button>编辑</a-button>
    <FormModal
      width="480"
      title="添加学生"
      :visible="visible"
      @submit="handleOk"
      :labelCol="{ style: { width: '150px' } }"
    >
      <template #action="{ submit, reset, instance }">
        <a-space style="margin-left: 150px">
          <a-button type="primary" @click="submit">提交</a-button>
          <a-button @click="reset">重置一下</a-button>
          <a-button type="danger" @click="getFormInstance(instance)"
            >获取 edit-form 组件实例</a-button
          >
        </a-space>
      </template>
    </FormModal>
  </div>
</template>
