<script lang="ts" setup>
  import { FormSchemas } from '@/components/form/type'
  import { DatePicker } from 'ant-design-vue'
  import { Form, FormContent } from '@/components/form'

  interface State {
    name?: string
    idNo?: string
    orderInfo: Array<{
      order_no?: string
      status?: string
      product_name?: string
      send_time?: string
      receive_time?: string
    }>
  }

  const clientInfoSchemas: FormSchemas = [
    {
      field: 'name',
      label: '客户姓名',
      component: 'Input',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '名字不可为空',
            trigger: 'blur',
          },
        ],
      },
      componentProps: {
        placeholder: '请输入',
      },
    },
    {
      field: 'idNo',
      label: '客户身份证',
      component: 'Input',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '客户身份证不可为空',
            trigger: 'blur',
          },
        ],
      },
    },
  ]

  const orderInfoSchemas: FormSchemas = [
    {
      type: 'table',
      field: 'orderInfo',
      default: [],
      min: 2,
      max: 5,
      formItemProps: {
        rules: [
          {
            required: true,
            type: 'array',
            message: '请添加订单信息',
            trigger: 'change',
          },
        ],
      },
      valueFormat: {
        order_no: '3131232131231',
        status: 1,
      },
      schemas: [
        {
          field: 'order_no',
          label: '订单号',
          formItemProps: (_record, _index) => ({
            rules: {
              required: true,
              message: 'Missing name',
            },
          }),
          componentProps: () => ({
            placeholder: '请输入',
          }),
        },
        {
          field: 'status',
          label: '订单状态',
          component: 'Select',
          formItemProps: (_record, _index) => ({
            rules: {
              required: true,
              message: 'Missing name',
            },
          }),
          componentProps: () => ({
            placeholder: '请选择',
            options: [
              { label: '待发货', value: 0 },
              { label: '已发货', value: 1 },
              { label: '待收货', value: 2 },
              { label: '已收货', value: 3 },
              { label: '待评价', value: 4 },
              { label: '已评价', value: 5 },
            ],
          }),
        },
        {
          field: 'product_name',
          label: '商品名称',
          formItemProps: (_record, _index) => ({
            rules: {
              required: true,
              message: '商品名称不可为空',
            },
          }),
          componentProps: () => ({
            placeholder: '请输入',
          }),
        },
        {
          field: 'send_time',
          label: '发货时间',
          component: DatePicker,
          formItemProps: () => {
            return {
              rules: [
                {
                  required: true,
                  message: '发货时间必选',
                  trigger: 'change',
                },
              ],
            }
          },
          componentProps: () => ({
            placeholder: '请选择',
            style: {
              width: '100%',
            },
          }),
        },
        {
          field: 'receive_time',
          label: '收货时间',
          component: DatePicker,
          formItemProps: () => {
            return {
              rules: [
                {
                  required: true,
                  message: '收货时间必选',
                  trigger: 'change',
                },
              ],
            }
          },
          componentProps: () => ({
            placeholder: '请选择',
            style: {
              width: '100%',
            },
          }),
        },
      ],
    },
  ]
  const initialState = ref<State>({
    name: '波仔',
    idNo: undefined,
    orderInfo: [],
  })
  const handleSubmit = (e: State) => {
    console.log('handleSubmit', e)
  }
</script>
<template>
  <page-layout>
    <page-header><h3>分块表单的使用</h3></page-header>
    <page-content background-color="''" style="padding: 0; margin-top: 20px">
      <Form
        :initialState="initialState"
        :label-col="{ style: '100px' }"
        @create-submit="handleSubmit"
      >
        <template #body="{ grid }">
          <a-card title="用户信息">
            <FormContent :grid="grid" :schemas="clientInfoSchemas" />
          </a-card>
          <a-card title="订单信息" style="margin-top: 24px">
            <FormContent :grid="grid" :schemas="orderInfoSchemas" />
          </a-card>
        </template>

        <template #action="{ submit }">
          <div class="btn-wrap">
            <a-button
              type="primary"
              shape="round"
              @click="submit"
              style="width: 100%"
              >提交</a-button
            >
          </div>
        </template>
      </Form>
    </page-content>
  </page-layout>
</template>
<style lang="less">
  .btn-wrap {
    position: fixed;
    bottom: 0;
    left: 200px;
    right: 0;
    background-color: #fff;
    padding: 12px 20px;
    display: flex;
    justify-content: flex-end;
    box-shadow: 0 0 6px #e0e0e0;
  }
</style>
