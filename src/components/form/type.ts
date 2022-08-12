/*
 * @Description:
 * @Date: 2022-06-27 15:35:46
 * @LastEditTime: 2022-06-30 17:08:10
 * @FilePath: \spvr-plat-web\src\components\core\bo-form\type.ts
 */
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
