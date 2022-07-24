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

export type ComponentProps = InputProps &
  SelectProps &
  DatePickerProps & {
    modifier?: WidgetModifier
  }

export interface FilterSearchSchemaItem {
  field: string
  component?: keyof typeof widgets
  label?: string
  width?: string
  defaultValue?: any
  initialValue?: any
  componentProps?: ComponentProps | ((arg: unknown) => ComponentProps)
  FormItemProps?: FormItemProps
}

export type FilterSearchSchemas = Array<FilterSearchSchemaItem>
