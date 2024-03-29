<script lang="ts" setup>
  import { FormSchemas } from '@/components/form/type'
  import { DatePicker } from 'ant-design-vue'
  import { Rule } from 'ant-design-vue/lib/form'
  import { Dayjs } from 'dayjs'
  import { onMounted } from 'vue'
  import { Form } from '@/components/form'
  import { disabledEndDate, disabledBeginDate } from '@/utils/disabled-date'

  interface State {
    title?: string
    startTime?: Dayjs
    endTime?: Dayjs
    status?: string
    members: Array<{
      name?: string
      sex: string
    }>
  }

  const schemas: FormSchemas<State> = [
    {
      field: 'title',
      label: '任务名称',
      component: 'Input',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入任务名称',
            trigger: 'blur',
          },
        ],
      },
      componentProps: {
        placeholder: '请输入任务名称',
      },
    },
    {
      field: 'startTime',
      label: '开始时间',
      component: DatePicker,
      grid: {
        xs: 12,
      },
      formItemProps: (formState) => {
        const validator = async (_rule: Rule, value: Dayjs) => {
          if (!value) {
            return Promise.reject('请输入开始时间')
          }
          if (formState.endTime && value > formState.endTime) {
            return Promise.reject('开始时间不能大于结束时间')
          }
          return Promise.resolve()
        }
        return {
          rules: [
            {
              required: true,
              validator,
              trigger: 'change',
            },
          ],
        }
      },
      componentProps: (formState) => ({
        placeholder: '请选择开始时间',
        disabledDate: (current: Dayjs) =>
          disabledEndDate(formState.endTime)(current),
      }),
    },
    {
      field: 'endTime',
      label: '结束时间',
      component: DatePicker,
      grid: {
        xs: 12,
      },
      formItemProps: (formState) => {
        const validator = async (_rule: Rule, value: Dayjs) => {
          if (!value) {
            return Promise.reject('请输入结束时间')
          }
          if (formState.startTime && value < formState.startTime) {
            return Promise.reject('结束时间不能小于于开始时间')
          }
          return Promise.resolve()
        }
        return {
          rules: [
            {
              required: true,
              validator,
              trigger: 'change',
            },
          ],
        }
      },
      componentProps: (formState) => ({
        placeholder: '请选择结束时间',
        disabledDate: (current: Dayjs) =>
          disabledBeginDate(formState.startTime)(current),
      }),
    },
    {
      field: 'status',
      label: '任务状态',
      component: 'Select',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择任务状态',
            trigger: 'change',
          },
        ],
      },
      componentProps: {
        placeholder: '请选择任务状态',
        options: [
          {
            value: '1',
            label: '待定',
          },
          {
            value: '2',
            label: '开始',
          },
          {
            value: '3',
            label: '结束',
          },
        ],
      },
    },
    {
      type: 'array',
      field: 'members',
      label: '执行人员',
      formItemProps: {
        rules: [
          {
            required: true,
            type: 'array',
            message: '请添加任务执行人员',
            trigger: 'change',
          },
        ],
      },
      valueFormat: {
        name: '',
        sex: undefined,
      },
      schemas: [
        {
          field: 'name',
          label: '姓名',
          formItemProps: (_record, _index) => ({
            rules: {
              required: true,
              message: 'Missing name',
            },
          }),

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
          formItemProps: (_record, _index) => ({
            rules: {
              required: true,
              message: 'Missing sex',
              trigger: 'change',
            },
          }),
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
  ]
  const initialState = ref<State>({
    members: [],
  })
  const handleSubmit = (e: any) => {
    console.log('handleSubmit', e)
  }
  onMounted(() => {
    // 异步赋予初始值
    setTimeout(() => {
      initialState.value = {
        ...initialState.value,
        title: '标题',
      }
    }, 1000)
  })
</script>
<template>
  <page-layout>
    <page-header><h3>表单的基本使用</h3></page-header>
    <page-content>
      <Form
        :schemas="schemas"
        :initialState="initialState"
        :label-col="{ style: '100px' }"
        @create-submit="handleSubmit"
      />
    </page-content>
  </page-layout>
</template>
<style lang="less"></style>
