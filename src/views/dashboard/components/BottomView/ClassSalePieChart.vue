<script lang="ts" setup>
  import Chart, { ECOption } from '@/components/chart'

  interface DataItem {
    name: string
    value: number
    percent: string
  }

  defineOptions({
    name: 'ClassSalePieChart',
  })

  const mockData: DataItem[] = [
    {
      name: '粉面粥店',
      value: 100,
      percent: '15.40%',
    },
    {
      name: '烧烤',
      value: 100,
      percent: '15.40%',
    },
    {
      name: '汉堡披萨',
      value: 100,
      percent: '15.40%',
    },
    {
      name: '水果',
      value: 100,
      percent: '15.40%',
    },
    {
      name: '便当',
      value: 100,
      percent: '15.40%',
    },
  ]

  const option: ECOption = {
    /* grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }, */
    legend: {
      type: 'scroll',
      orient: 'vertical',
    },
    title: [
      {
        text: '品类分布',
        textStyle: {
          fontSize: 14,
          color: '#666',
        },
        left: 20,
        top: 20,
      },
      {
        text: '累计订单量',
        textStyle: {
          fontSize: 14,
          color: '#999',
        },
        subtextStyle: {
          fontSize: 28,
          color: '#333',
        },
        subtext: '320',
        left: '34.5%',
        top: '42.5%',
        textAlign: 'center',
      },
    ],
    series: [
      {
        type: 'pie',
        data: mockData,
        center: ['35%', '50%'],
        radius: ['35%', '50%'],
        label: {
          show: true,
          position: 'outer',
          formatter(params) {
            const data = params.data as DataItem
            return `${data.name} | ${data.percent}`
          },
        },
        labelLine: {
          length: 5,
          length2: 3,
          smooth: true,
        },
        // 顺时针排列
        clockwise: true,
      },
    ],
  }
</script>

<template>
  <Chart style="width: 100%; height: 100%" :option="option" />
</template>
<style lang="less" scoped></style>
