<script lang="ts" setup>
  import Chart, { ECOption } from '@/components/chart'
  defineOptions({
    name: 'TodayOrderBarChart',
  })

  const props = defineProps({
    columns: {
      type: Array as PropType<Array<string>>,
      default: () => [],
    },
    data: {
      type: Array as PropType<Array<number>>,
      default: () => [],
    },
    color: {
      type: Array as PropType<Array<string>>,
      default: () => ['#3398db'],
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
      data: props.columns,
    },
    yAxis: {
      show: false,
    },
    color: props.color,
    series: [
      {
        type: 'bar',
        data: props.data,
      },
    ],
  }
</script>

<template>
  <Chart style="width: 100%; height: 100%" :option="option" />
</template>
<style lang="less" scoped></style>
