import { ColumnType } from 'ant-design-vue/lib/table'
import type { WidgetKeys, WidgetProps } from '../form/type'

export interface BodyCellType<T = any> {
  column: TableColumnItem<T>
  index: number
  record: T
  text: string | Element | JSX.Element
  value: any
}
// InstanceType<typeof TableColumn>

export interface TableColumnItem<T = any>
  extends Omit<ColumnType, 'dataIndex'> {
  dataIndex: keyof T | 'action' | 'my--index' | 'index'
  // 插槽，优先渲染slot内容
  slot?: (arg: BodyCellType<T>) => JSX.Element | string | number
  // 表头提示
  headerTip?: JSX.Element | string
  // 编辑状态下，隐藏其列
  hideInEdit?: boolean
  // 是否可编辑
  isEdit?: boolean
  // 表单控件属性
  widgetProps?: WidgetProps & {
    component?: WidgetKeys
  }
}

export type TableColumns<T = any> = Array<TableColumnItem<T>>
