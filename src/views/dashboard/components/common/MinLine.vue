<script lang="ts" setup>
  import Chart, { ECOption } from '@/components/chart'
  import { LineSeriesOption } from 'echarts'
  defineOptions({
    name: 'MinLine',
  })

  const props = defineProps({
    areaStyle: {
      type: Object as PropType<LineSeriesOption['areaStyle']>,
      default: () => ({}),
    },
    lineStyle: {
      type: Object as PropType<LineSeriesOption['lineStyle']>,
      default: () => ({}),
    },
    data: {
      type: Array as PropType<Array<number>>,
      default: () => [],
    },
  })

  const option: ECOption = {
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    xAxis: {
      type: 'category',
      show: false,
    },
    yAxis: {
      show: false,
    },
    series: [
      {
        type: 'line',
        data: props.data,
        smooth: true,
        areaStyle: {
          color: 'purple',
          ...props.areaStyle,
        },
        lineStyle: {
          width: 0,
          ...props.lineStyle,
        },
        itemStyle: {
          opacity: 0,
        },
      },
    ],
  }
</script>

<template>
  <Chart style="width: 100%; height: 100%" :option="option" />
</template>
<style lang="less" scoped></style>
