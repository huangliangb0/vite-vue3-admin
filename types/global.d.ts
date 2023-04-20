import { CreateAppFunction } from 'vue'
import { GRID_KEYS, GRID_VALUES } from '@/constant/app'

import type { VNodeChild, PropType as VuePropType } from 'vue'

declare global {
  interface Window {
    poiPicker: any
    AMapUI: any
  }

  declare type PropType<T> = VuePropType<T>
  declare type VueNode = VNodeChild | JSX.Element

  /* App 实例 */
  type AppInstance = ReturnType<CreateAppFunction<Element>>
  /* 触发响应式布局的断点标识符 */
  type GridKeyType = typeof GRID_KEYS[number]
  /* 触发响应式布局的断点宽度 */
  type GridValueType = typeof GRID_VALUES[number]
  type GridColType = Partial<Record<GridKeyType, number | string>>

  // declare type GridCol = {
  //   span?: number
  //   offset?: number
  // } & {
  //   [k in GridKeyType]?: { span?: number; offset?: number }
  // }
}
