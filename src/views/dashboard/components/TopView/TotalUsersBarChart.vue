<script lang="ts" setup>
  import Chart, { ECOption } from '@/components/chart'
  defineOptions({
    name: 'TotalUsersBarChart',
  })
  const option: ECOption = {
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    xAxis: {
      type: 'value',
      show: false,
    },
    yAxis: {
      type: 'category',
      show: false,
    },
    series: [
      {
        type: 'bar',
        data: [200],
        stack: '总量',
        barWidth: 10,
        itemStyle: {
          color: '#45c946',
        },
      },
      {
        type: 'bar',
        data: [50],
        stack: '总量',
        barWidth: 10,
        itemStyle: {
          color: '#eee',
        },
      },
      {
        type: 'custom',
        data: [200],
        renderItem: (params, api) => {
          const value = api.value(0)
          const endPoint = api.coord([value, 0])
          return {
            type: 'group',
            position: endPoint,
            children: [
              {
                type: 'path',
                shape: {
                  d: 'M952.32 715.2l-416-485.376c-12.16-14.176-36.448-14.176-48.608 0l-416 485.376c-8.128 9.472-9.984 22.848-4.768 34.176C72.16 760.704 83.488 768 96 768l832 0c12.512 0 23.84-7.296 29.056-18.624S960.448 724.672 952.32 715.2z',
                  x: -5,
                  y: 6,
                  width: 10,
                  height: 10,
                  layout: 'cover',
                },
                style: {
                  fill: '#45c946',
                },
              },
              {
                type: 'path',
                shape: {
                  d: 'M957.056 338.624C951.84 327.296 940.512 320 928 320L96 320c-12.512 0-23.84 7.296-29.088 18.624-5.216 11.36-3.328 24.704 4.768 34.208l416 485.344c6.08 7.104 14.944 11.2 24.288 11.2s18.208-4.096 24.288-11.2l416-485.344C960.448 363.328 962.272 349.984 957.056 338.624z',
                  x: -5,
                  y: -16,
                  width: 10,
                  height: 10,
                  layout: 'cover',
                },
                style: {
                  fill: '#45c946',
                },
              },
            ],
          }
        },
      },
    ],
  }
</script>

<template>
  <Chart style="width: 100%; height: 100%" :option="option" />
</template>
<style lang="less" scoped></style>
