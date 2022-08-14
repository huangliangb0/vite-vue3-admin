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
  color?: Color
}>
