<script lang="ts" setup>
  import {
    TotalOrderLineChart,
    TodayOrderBarChart,
    TotalUsersBarChart,
  } from '.'
  import Compare from '@/components/compare'

  defineOptions({
    name: 'TopView',
  })

  const cardBodyStyle = {
    paddingBottom: 0,
  }
</script>

<template>
  <a-row :gutter="[20, 20]" class="top-view">
    <a-col :span="6">
      <a-card :body-style="cardBodyStyle">
        <p class="name">累计销售额</p>
        <p class="value">￥342423423</p>
        <div class="chart-box align-center">
          <Compare name="日同比" :value="-10" />
          <Compare name="月同比" :value="10" />
        </div>
        <a-divider class="divider" type="horizontal" />
        <div class="foot">
          <a-space>
            <span class="t-name">昨日销售额</span>
            <span class="t-value">￥123213</span>
          </a-space>
        </div>
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card :body-style="cardBodyStyle">
        <p class="name">累计订单量</p>
        <p class="value">234234324</p>
        <div class="chart-box">
          <TotalOrderLineChart />
        </div>
        <a-divider class="divider" type="horizontal" />
        <div class="foot">
          <a-space>
            <span class="t-name">最日订单量</span>
            <span class="t-value">2342324234</span>
          </a-space>
        </div>
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card :body-style="cardBodyStyle">
        <p class="name">今日交易用户数</p>
        <p class="value">234324324</p>
        <div class="chart-box">
          <TodayOrderBarChart />
        </div>
        <a-divider class="divider" type="horizontal" />
        <div class="foot">
          <a-space>
            <span class="t-name">退回率</span>
            <span class="t-value">1312324234</span>
          </a-space>
        </div>
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card :body-style="cardBodyStyle">
        <p class="name">累计用户数</p>
        <p class="value">234233345</p>
        <div class="chart-box">
          <TotalUsersBarChart />
        </div>
        <a-divider class="divider" type="horizontal" />
        <div class="foot">
          <a-space>
            <Compare name="日同比" :value="-10" :size="10" />
            <Compare name="月同比" :value="10" :size="10" />
          </a-space>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>
<style lang="less" scoped>
  .top-view {
    p {
      margin: 0;
    }
    .name {
      font-size: 12px;
      color: #999;
    }
    .value {
      font-size: 25px;
      color: #000;
      margin-top: 5px;
    }
    .chart-box {
      height: 50px;
    }
    .divider {
      margin: 10px 0 0 0;
    }
    .foot {
      font-size: 12px;
      height: 36px;
      display: flex;
      align-items: center;
      .t-name {
        color: #666;
      }
      .t-value {
        color: #000;
      }
    }
  }
  .align-center {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // align-content: center;
  }
</style>
