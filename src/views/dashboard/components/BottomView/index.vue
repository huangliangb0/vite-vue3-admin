<script lang="ts" setup>
  import { TableColumns } from '@/components/basic-table'
  import { MinLine, StatisBox } from '../common'
  import ClassSalePieChart from './ClassSalePieChart.vue'

  interface DataItem {
    id: number
    rank: number
    keyword: string
    count: number
    users: number
    range: string
  }

  defineOptions({
    name: 'BottomView',
  })
  const tableColumns: TableColumns<DataItem> = [
    {
      dataIndex: 'rank',
      title: '排名',
    },
    {
      dataIndex: 'keyword',
      title: '关键词',
    },
    {
      dataIndex: 'count',
      title: '总搜索量',
    },
    {
      dataIndex: 'users',
      title: '搜索用户数',
    },
  ]

  const tableData: DataItem[] = [
    {
      id: 1,
      rank: 1,
      keyword: '北京',
      count: 100,
      users: 100,
      range: '100%',
    },
    {
      id: 2,
      rank: 2,
      keyword: '上海',
      count: 90,
      users: 90,
      range: '100%',
    },
    {
      id: 3,
      rank: 3,
      keyword: '广州',
      count: 80,
      users: 80,
      range: '100%',
    },
    {
      id: 4,
      rank: 4,
      keyword: '深圳',
      count: 70,
      users: 70,
      range: '100%',
    },
  ]
  const pagination = reactive({
    pageSize: 4,
    total: 100,
    current: 1,
    showQuickJumper: false,
    showTotal: false,
  })
  const onPaginationChange = ({ current }: any) => {
    pagination.current = current
  }

  /*** 饼图的options */
</script>

<template>
  <a-row :gutter="[20, 20]">
    <a-col :span="12">
      <a-card title="关键词搜索">
        <div class="static-wrap">
          <a-row :gutter="[20, 20]">
            <a-col :span="12">
              <StatisBox title="搜索用户数" value="234234324">
                <MinLine
                  :data="[
                    620, 658, 580, 220, 360, 480, 790, 399, 432, 439, 750, 592,
                    330, 890, 620,
                  ]"
                  :areaStyle="{ color: 'rgba(95, 187, 255, 0.5)' }"
                  :lineStyle="{ color: 'rgba(95, 187, 255, 1)', width: 1 }"
                />
              </StatisBox>
            </a-col>
            <a-col :span="12">
              <StatisBox title="搜索量" value="234234324">
                <MinLine
                  :data="[
                    620, 658, 580, 220, 360, 480, 790, 399, 432, 439, 750, 592,
                    330, 890, 620,
                  ]"
                  :areaStyle="{ color: 'rgba(95, 187, 255, 0.5)' }"
                  :lineStyle="{ color: 'rgba(95, 187, 255, 1)', width: 1 }"
                />
              </StatisBox>
            </a-col>
            <a-col :span="24">
              <basic-table
                :columns="tableColumns"
                :data="tableData"
                :pagination="pagination"
                @change="onPaginationChange"
              />
            </a-col>
          </a-row>
        </div>
      </a-card>
    </a-col>
    <a-col :span="12">
      <a-card title="关键词搜索">
        <div class="pie-wrapper">
          <ClassSalePieChart />
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>
<style lang="less" scoped>
  .pie-wrapper {
    height: 424px;
  }
</style>
