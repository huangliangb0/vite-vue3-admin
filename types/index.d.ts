declare type Recordable<T = any> = Record<string, T>

declare type Color = 'success' | 'error' | 'warning' | 'default' | 'processing'

declare interface PaginationType {
  current: number
  pageSize: number
  total: number
}

declare type OptionsType = Array<{
  label: string
  value: any
  disabled?: Boolean
  color?: Color
}>

// 树型数据结构类型
declare type TreeDataType<T = any> = Array<T & { children: TreeData }>

// 扁平数据结构类型
declare type FlatDataType = Array<{
  id: string
  parentId?: string
  [K in T]: T[k]
}>
