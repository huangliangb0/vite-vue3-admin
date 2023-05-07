<script lang="ts" setup>
  import Chart, { ECOption } from '@/components/chart'
  defineOptions({
    name: 'TodayOrderBarChart',
  })
  const option: ECOption = {
    grid: {
      top: 20,
      left: 50,
      right: 30,
      bottom: 30,
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
      axisTick: {
        alignWithLabel: true,
        lineStyle: {
          color: '#999',
        },
      },
      axisLine: {
        lineStyle: {
          color: '#999',
        },
      },
      axisLabel: {
        color: '#666',
      },
    },
    yAxis: {
      show: true,
      type: 'value',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          type: 'dotted',
          color: '#eee',
        },
      },
    },
    color: ['#3398db'],
    series: [
      {
        type: 'bar',
        barWidth: '35%',
        data: [620, 658, 580, 220, 360, 480, 790, 399, 432, 439, 750, 592],
      },
    ],
  }
</script>

<template>
  <Chart style="width: 100%; height: 100%" :option="option" />
</template>
<style lang="less" scoped></style>
