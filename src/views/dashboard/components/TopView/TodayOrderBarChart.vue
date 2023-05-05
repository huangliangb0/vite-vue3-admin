<script lang="ts" setup>
  import Chart, { ECOption } from '@/components/chart'
  defineOptions({
    name: 'TodayOrderBarChart',
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
      data: [
        '00:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
      ],
    },
    yAxis: {
      show: false,
    },
    color: ['#3398db'],
    series: [
      {
        type: 'bar',
        data: [
          620, 658, 580, 220, 360, 480, 790, 399, 432, 439, 750, 592, 330, 890,
          620,
        ],
      },
    ],
  }
</script>

<template>
  <Chart style="width: 100%; height: 100%" :option="option" />
</template>
<style lang="less" scoped></style>
