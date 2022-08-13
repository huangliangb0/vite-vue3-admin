import EditForm from './EditForm.vue'
import FilterSearch from './FilterSearch.vue'
import widgets from './widgets'
import type {
  FormItemProps,
  SelectProps,
  InputProps,
  DatePickerProps,
} from 'ant-design-vue'

export type WidgetModifier = {
  trim?: Boolean
}

export type WidgetProps = InputProps &
  SelectProps &
  DatePickerProps & {
    modifier?: WidgetModifier
  }

export type WidgetKeys = keyof typeof widgets

export interface FormSchemaItem {
  type?: 'default' | 'array'
  field: string
  component?: WidgetKeys
  label?: string
  span?: number
  defaultValue?: any
  valueFormat?: string | number | boolean | Recordable
  componentProps?: WidgetProps | ((arg: unknown) => WidgetProps)
  formItemProps?: FormItemProps
  schemas?: Array<FormSchemaItem>
}

export type FormSchemas = Array<FormSchemaItem>

export type EditFormInstance = InstanceType<typeof EditForm> & {
  // 从 EditForm 暴露出的方法或者属性
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
