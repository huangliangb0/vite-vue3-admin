<script lang="ts" setup>
  import { ChartContent } from '@/components/chart'
  import SalesBarChart from './SalesBarChart.vue'
  import Section from './Section.vue'
  import SalesRanking from './SalesRanking.vue'
  defineOptions({
    name: 'SalesView',
  })

  const menuSelected = ref('sale')
  const timePeriod = ref('a')
  const datePeriod = ref(null)
</script>

<template>
  <a-card :body-style="{ padding: 0 }">
    <page-layout>
      <page-header :border="false">
        <a-menu v-model:selectedKeys="menuSelected" mode="horizontal">
          <a-menu-item key="sale">销售额</a-menu-item>
          <a-menu-item key="visit">访问量</a-menu-item>
        </a-menu>
        <div class="header-r-box">
          <a-space>
            <a-radio-group v-model:value="timePeriod" button-style="solid">
              <a-radio-button value="a">今日</a-radio-button>
              <a-radio-button value="b">本周</a-radio-button>
              <a-radio-button value="c">本月</a-radio-button>
              <a-radio-button value="d">今年</a-radio-button>
            </a-radio-group>
            <a-range-picker
              showToday
              v-model:value="datePeriod"
              valueFormat="YYYY-MM-DD"
            />
          </a-space>
        </div>
      </page-header>
      <page-content>
        <div class="content-wrap">
          <div class="chart-wrap">
            <Section title="年度销售额">
              <SalesBarChart />
            </Section>
          </div>
          <div class="sales-ranking-wrap">
            <Section title="排行榜">
              <SalesRanking />
            </Section>
          </div>
        </div>
      </page-content>
    </page-layout>
  </a-card>
</template>
<style lang="less" scoped>
  .header-r-box {
    position: absolute;
    right: @margin;
    top: 50%;
    transform: translateY(-50%);
  }
  .content-wrap {
    display: flex;
    height: 250px;
  }
  .chart-wrap {
    flex: 0 0 70%;
    width: 70%;
    height: 100%;
  }
</style>
