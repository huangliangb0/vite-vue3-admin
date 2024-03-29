import Form from './Form.vue'
import FilterSearch from './FilterSearch.vue'
import widgets from './widgets'
import type {
  FormItemProps,
  SelectProps,
  InputProps,
  DatePickerProps,
} from 'ant-design-vue'
import { DefineComponent, VNode } from 'vue'

export type WidgetModifier = {
  trim?: Boolean
}

export type WidgetProps = InputProps &
  SelectProps &
  DatePickerProps & {
    modifier?: WidgetModifier
    extra?: string | (() => VNode)
  }

export type WidgetKeys = keyof typeof widgets

export interface FormSchemaItem<T = Recordable> {
  type?: 'default' | 'array' | 'table'
  // 字段名
  field: string
  component?: WidgetKeys | DefineComponent<Recordable, Recordable, any>
  label?: string
  // 默认值
  default?: any
  // width type为table的时候可能有用
  width?: number
  // 动态控件时，即type = 'array'，设置默认值格式
  valueFormat?: string | number | boolean | Recordable
  // 这个再编辑表单中有用，因为多个表单控件可能会在同一行
  grid?: GridColType
  // 当 type 为list、table时，可限制list或者table的列表长度
  min?: number
  max?: number
  // widget 组件的属性，比如Input、Select
  componentProps?: WidgetProps | ((formState: T) => WidgetProps)
  // a-form-item的属性
  formItemProps?: FormItemProps | ((formState: T) => FormItemProps)
  // 动态控件时，即type = 'array'，设置的组件类型
  schemas?: Array<
    Omit<FormSchemaItem, 'formItemProps'> & {
      formItemProps?:
        | FormItemProps
        | ((record: T, index: number) => FormItemProps)
    }
  >
}

export type FormSchemas<T = Recordable> = Array<FormSchemaItem<T>>

export type EditFormInstance = InstanceType<typeof Form> & {
  // 从 Form 暴露出的方法或者属性
  formState: Recordable
  change: (o: Recordable) => void
  reset: () => void
  submit: () => Recordable
}
export type FilterSearchInstance = InstanceType<typeof FilterSearch> & {
  // 从 FilterSearch 暴露出的方法或者属性
  formState: Recordable
  change: (o: Recordable) => void
  reset: () => void
  submit: () => Recordable
}
