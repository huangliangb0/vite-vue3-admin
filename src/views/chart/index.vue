<script lang="tsx" setup>
  import {
    ChartContainer,
    ChartContent,
    ChartOptionsType,
    BarChart,
    LineChart,
    PieChart,
  } from '@/components/chart'
  import { onMounted, ref } from 'vue'

  defineOptions({
    name: 'Chart',
  })

  const loading = ref(false)
  const data = ref<any[]>([])
  const data2 = ref<number[]>([])

  const typeOptions: ChartOptionsType = [
    {
      icon: 'chart-bar',
      type: 'bar',
    },
    {
      icon: 'chart-line',
      type: 'line',
    },
    {
      icon: 'chart-pie',
      type: 'pie',
    },
  ]

  onMounted(() => {
    loading.value = true
    setTimeout(() => {
      data.value = [
        { value: 335, name: 'Direct' },
        { value: 310, name: 'Email' },
        { value: 234, name: 'Ad Networks' },
        { value: 135, name: 'Video Ads' },
        { value: 1548, name: 'Search Engines' },
      ]
      data2.value = [335, 310, 234, 135, 1548]
      loading.value = false
    }, 1000)
  })
</script>
<template>
  <div class="page--container chart-page_container">
    <a-row flex="wrap" :gutter="[20, 20]">
      <a-col :span="12"
        ><div class="section">
          <ChartContent :columns="data" :loading="loading">
            <template #default="slotProps">
              <PieChart v-bind="slotProps" title="标题" />
            </template>
          </ChartContent> </div
      ></a-col>
      <a-col :span="12"
        ><div class="section">
          <ChartContent :columns="data" :loading="loading">
            <template #default="slotProps">
              <LineChart v-bind="slotProps" />
            </template>
          </ChartContent> </div
      ></a-col>
      <a-col :span="12"
        ><div class="section">
          <ChartContent :columns="data" :loading="loading">
            <template #default="slotProps">
              <BarChart v-bind="slotProps" />
            </template>
          </ChartContent> </div
      ></a-col>
      <a-col :span="12">
        <div class="section">
          <ChartContainer
            :typeOptions="typeOptions"
            :columns="data"
            :loading="loading"
            title="统计图"
          >
            <template #bar="slotProps">
              <BarChart v-bind="slotProps" />
            </template>
            <template #line="slotProps">
              <LineChart v-bind="slotProps" />
            </template>
            <template #pie="slotProps">
              <PieChart v-bind="slotProps" />
            </template>
          </ChartContainer>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<style lang="less">
  .chart-page_container {
    width: 100%;
    height: 100%;
    // display: grid;
    // grid-template-columns: 1fr 1fr;
    // grid-template-rows: 1fr 1fr;
    // grid-column-gap: 24px;
    // grid-row-gap: 24px;
    background: #fff;
    box-sizing: border-box;
    padding: 24px;
    .ant-row {
      height: 100%;
    }

    .section {
      background-color: #f6f8fc;
      height: 100%;
      width: 100%;
    }
  }
</style>
