<script setup lang="tsx">
  import { computed, inject } from 'vue'
  import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue/lib/icons'
  import { uniqueId } from 'lodash-es'
  import { Rule } from 'ant-design-vue/lib/form'

  import { FormSchemaItem } from '../type'
  import { Widget } from '../widgets'
  import BasicTable, { TableColumns } from '@/components/basic-table'

  const props = defineProps({
    field: {
      type: String,
      required: true,
    },
    rules: Object as PropType<Record<string, Rule>>,
    valueFormat: {
      type: Object as PropType<Recordable>,
      default: () => ({}),
    },
    schemas: {
      type: Array as PropType<FormSchemaItem['schemas']>,
      default: () => [],
    },
  })

  const formState = inject('__formState__') as Record<string, any[]>

  onMounted(() => {
    if (
      Array.isArray(formState[props.field]) &&
      formState[props.field].length > 0
    ) {
      formState[props.field] = formState[props.field].map((item) => ({
        __uuid__: uniqueId,
        ...item,
      }))
    } else {
      formState[props.field] = [{ ...props.valueFormat }]
    }
  })

  const columns = computed(() => {
    const clms = props.schemas!.map((item) => {
      return {
        title: item.label,
        dataIndex: item.field,
        key: item.field,
        width: item.width || 220,
        slot: ({ record, index }) => {
          if (item.component === undefined) {
            item.component = 'Input'
          }

          const Comp =
            typeof item.component === 'string' ? Widget : item.component

          const componentProps =
            typeof item.componentProps === 'function'
              ? item.componentProps(record)
              : item.componentProps

          const formItemProps =
            typeof item.formItemProps === 'function'
              ? item.formItemProps(record, index)
              : item.formItemProps

          return (
            <a-form-item
              name={[props.field, index, item.field]}
              {...formItemProps}
            >
              {/* @ts-ignore */}
              <Comp
                component={item.component}
                v-model:value={record[item.field]}
                {...componentProps}
              />
            </a-form-item>
          )
        },
      }
    }) as TableColumns<Recordable>

    const result: TableColumns<Recordable> = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: 44,
        slot: ({ index }) => <span>{index + 1}</span>,
      },
      ...clms,
      {
        title: '操作',
        width: 44,
        fixed: 'right',
        dataIndex: '__delete__',
        key: '__delete__',
        slot: ({ index }) =>
          formState[props.field].length > 1 ? (
            <DeleteOutlined
              onclick={() => formState[props.field].splice(index, 1)}
              style="color: #979797;cursor: pointer"
            />
          ) : (
            ''
          ),
      },
    ]
    return result
  })

  const onAdd = () => {
    formState[props.field].push({ __uuid__: uniqueId(), ...props.valueFormat })
  }
</script>

<template>
  <a-row :gutter="[20, 20]">
    <a-col :span="24">
      <BasicTable
        class="table--form--list"
        :show-index="false"
        :row-key="'uuid'"
        :columns="columns"
        :data="formState[field] || []"
        :scroll="{ x: 1440 }"
        :pagination="false"
        :border="false"
      />
    </a-col>
    <a-col :span="24">
      <a-button type="dashed" block @click="onAdd">
        <PlusOutlined />
        添加一行
      </a-button>
    </a-col>
  </a-row>
</template>

<style lang="less">
  .table--form--list {
    .ant-table-thead > tr > th {
      background-color: #fff;
      line-height: 1;
      padding-top: 9px !important;
      padding-bottom: 9px !important;
      &::before {
        display: none;
      }
    }
    td {
      vertical-align: top;
    }
  }
</style>
