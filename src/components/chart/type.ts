import { DefineComponent, VNode } from 'vue'
import { BarSeriesOption, LineSeriesOption } from 'echarts/charts'
import {
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
} from 'echarts/components'
import * as echarts from 'echarts/core'
// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>

export type ChartDataType = Array<{ name: string; value: number }>
export type ChartType = 'line' | 'bar' | 'pie'
export type ChartIconType = 'chart-bar' | 'chart-line' | 'chart-pie'
export type ChartOptionsType = {
  icon: ChartIconType
  type: ChartType
}[]
