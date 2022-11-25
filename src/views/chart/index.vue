<script lang="tsx" setup>
  import { useBarChart, useLineChart, usePieChart } from '@/hook/chart'
  import { onMounted, ref } from 'vue'

  defineOptions({
    name: 'Chart',
  })

  const label = [
    'Direct',
    'Email',
    'Ad Networks',
    'Video Ads',
    'Search Engines',
  ]
  const data = ref<any[]>([])
  const data2 = ref<number[]>([])

  const { PieChart, done: pieDone } = usePieChart({
    label,
    data,
  })
  const { LineChart, done: lineDone } = useLineChart({
    label,
    data: data2,
  })
  const { BarChart, done: barDone } = useBarChart({
    label,
    data: data2,
  })

  onMounted(() => {
    setTimeout(() => {
      pieDone()
      lineDone()
      barDone()
      data.value = [
        { value: 335, name: 'Direct' },
        { value: 310, name: 'Email' },
        { value: 234, name: 'Ad Networks' },
        { value: 135, name: 'Video Ads' },
        { value: 1548, name: 'Search Engines' },
      ]
      data2.value = [335, 310, 234, 135, 1548]
    }, 3000)
  })
</script>
<template>
  <div class="page--container">
    <PieChart />
    <LineChart />
    <BarChart />
    <PieChart />
  </div>
</template>
<style lang="less">
  .page--container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 50% 50%;
  }
</style>
