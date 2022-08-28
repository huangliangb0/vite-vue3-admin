<script lang="ts" setup>
  import { EditFormInstance } from '@/components/form'

  import { useFormModal } from '@/hook'
  import { Rule } from 'ant-design-vue/lib/form'
  import { omit, pick } from 'lodash'
  const checkLinkman = (
    _rule: Rule,
    value: Array<{ name: string; phone: string }>,
  ) => {
    if (!value || value.length === 0) {
      return Promise.reject('联系人不能为空')
    }

    const isExistEmpty = value.some((item) => {
      if (item.name === '' || item.phone === '') {
        return true
      }
    })
    if (isExistEmpty) {
      return Promise.reject('联系人姓名或者电话没填')
    }

    return Promise.resolve()
  }

  const { FormModal, visible, openFormModal, openEditFormModal } = useFormModal(
    {
      schemas: [
        {
          field: 'grade',
          label: '年级',
          component: 'Select',
          formItemProps: {
            rules: [
              { required: true, message: '请选择年级', trigger: 'change' },
            ],
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
          formItemProps: {
            rules: [
              { required: true, message: '请输入学生姓名', trigger: 'blur' },
            ],
          },
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
            name: '张三',
            phone: '18888888888',
          },
          formItemProps: {
            rules: [
              {
                validator: checkLinkman,
                trigger: 'change',
              },
            ],
          },
          schemas: [
            {
              field: 'name',
              label: '家长姓名',
              componentProps: () => ({
                placeholder: '请输入联系人姓名',
              }),
            },
            {
              field: 'phone',
              label: '联系电话',
              componentProps: () => ({
                placeholder: '请输入联系人电话',
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
    },
  )

  /**
   * 编辑
   * record 往往结合 omit 和 pick 工具方法使用,因为我们往往编辑数据的时候会从列表拿最初值 rocord
   * 而rocord的值可能不是全部都需要
   */
  const editClick = (record: Recordable) => {
    console.log(111, omit(record, ['updateTime'])) // {  grade: 1}
    console.log(222, pick(record, ['grade'])) // {  grade: 1}
    openEditFormModal(pick(record, ['grade']))
  }
  // 新增
  const addClick = () => {
    openFormModal()
  }
  const handleOk = (arg: any) => {
    console.log(arg)
  }
  const getFormInstance = (instance: EditFormInstance) => {
    console.log('获取 edit-form 组件实例', instance)
  }
</script>

<template>
  <page-layout>
    <div>
      <a-card>
        <template #title>
          <h3>添加/编辑</h3>
          <p>编辑时，我们往往会给表单设置一些默认值</p>
          <p
            >窗口关闭时，会对值进行重置，可根据自己的需求在<em>@/hook/form-modal.ts</em>文件里修改</p
          >
        </template>
        <a-button @click="addClick">添加</a-button>
        <a-button
          @click="editClick({ grade: 1, updateTime: '2022-08-12 00:00:00' })"
          >编辑</a-button
        >
        <FormModal
          title="添加学生"
          :visible="visible"
          @submit="handleOk"
          :label-width="88"
          colon
        >
          <template #action="{ submit, reset, instance }">
            <a-space>
              <a-button type="primary" @click="submit">提交</a-button>
              <a-button @click="reset">重置一下</a-button>
              <a-button type="danger" @click="getFormInstance(instance)"
                >获取 edit-form 组件实例</a-button
              >
            </a-space>
          </template>
        </FormModal>
      </a-card>
    </div>
  </page-layout>
</template>
