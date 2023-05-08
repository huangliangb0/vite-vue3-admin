<script lang="ts" setup>
  import {
    TotalOrderLineChart,
    TodayOrderBarChart,
    TotalUsersBarChart,
  } from '.'
  import Compare from '@/components/compare'
  import { MinBar, MinLine, StatisBox } from '../common'

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
        <StatisBox title="累计销售额" value="￥342423423">
          <div class="align-center" style="height: 100%">
            <Compare name="日同比" :value="-10" />
            <Compare name="月同比" :value="10" />
          </div>
        </StatisBox>
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
        <StatisBox title="累计订单量" value="234234324">
          <MinLine
            :data="[
              620, 658, 580, 220, 360, 480, 790, 399, 432, 439, 750, 592, 330,
              890, 620,
            ]"
            :areaStyle="{ color: 'purple' }"
          />
        </StatisBox>
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
        <StatisBox title="今日交易用户数" value="234324324">
          <MinBar
            :columns="[
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
            ]"
            :data="[
              620, 658, 580, 220, 360, 480, 790, 399, 432, 439, 750, 592, 330,
              890,
            ]"
          />
        </StatisBox>

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
        <StatisBox title="累计用户数" value="234233345">
          <TotalUsersBarChart />
        </StatisBox>
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
