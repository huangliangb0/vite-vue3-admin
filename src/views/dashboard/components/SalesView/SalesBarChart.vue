<script lang="ts" setup>
  import Chart, { ECOption } from '@/components/chart'
  defineOptions({
    name: 'TodayOrderBarChart',
  })
  const option: ECOption = {
    grid: {
      top: 30,
      left: 50,
      right: 0,
      bottom: 20,
    },
    xAxis: {
      type: 'category',
      show: true,
      data: [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
      ],
    },
    yAxis: {
      show: true,
      type: 'value',
    },
    color: ['#3398db'],
    series: [
      {
        type: 'bar',
        data: [620, 658, 580, 220, 360, 480, 790, 399, 432, 439, 750, 592],
      },
    ],
  }
</script>

<template>
  <Chart style="width: 100%; height: 100%" :option="option" />
</template>
<style lang="less" scoped></style>
