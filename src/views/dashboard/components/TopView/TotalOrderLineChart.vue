<script lang="ts" setup>
  import Chart, { ECOption } from '@/components/chart'
  defineOptions({
    name: 'TotalOrderLineChart',
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
        data: [
          620, 658, 580, 220, 360, 480, 790, 399, 432, 439, 750, 592, 330, 890,
          620,
        ],
        smooth: true,
        areaStyle: {
          color: 'purple',
        },
        lineStyle: {
          width: 0,
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
