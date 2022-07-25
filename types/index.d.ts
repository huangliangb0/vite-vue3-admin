declare type Recordable<T = any> = Record<string, T>

declare type GridKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'
declare type GridValue = 576 | 768 | 992 | 1200 | 1600 | 2000

declare interface PaginationType {
  current: number
  pageSize: number
  total: number
}

declare type OptionsType = Array<{
  label: string
  value: any
}>
