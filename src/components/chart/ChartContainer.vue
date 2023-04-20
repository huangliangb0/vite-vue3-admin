<!--
 * @Description: 图表类型切换
 * @Date: 2022-07-08 11:47:15
 * @LastEditTime: 2022-09-01 16:38:50
 * @FilePath: \spvr-plat-web\src\components\business\charts\WrapChart.vue
-->

<script lang="ts" setup>
  import { ref } from 'vue'
  import { Space } from 'ant-design-vue'
  import { ChartType, ChartOptionsType } from './type'
  import ChartContent from './ChartContent.vue'
  import { ECharts } from 'echarts'
  defineOptions({
    name: 'ChartContainer',
    inheritAttrs: false,
  })
  const props = defineProps({
    // 类型 bar | line | pie
    type: {
      type: String as PropType<ChartType>,
      default: 'bar',
    },
    typeOptions: {
      type: Array as PropType<ChartOptionsType>,
      default: () => [],
    },
    title: String,
    columns: {
      type: Array as PropType<any[]>,
      default: () => [],
    },

    // 是否可以下载图片
    isExportImg: {
      type: Boolean,
      default: false,
    },
  })
  const method = ref<Record<string, () => void>>({})
  const myChart = ref<ECharts>()

  const type = ref<ChartType>(props.type)

  const toggleType = (value: ChartType) => {
    type.value = value
  }

  // 获取 图表插件方法
  const getMethod = (arg: Record<string, () => void>) => {
    method.value = arg
  }

  // 获取 图表实例
  const getInstance = (arg: ECharts) => {
    myChart.value = arg
  }

  // 到处图片
  const handleExportImg = () => {
    method.value?.exportImg()
  }
</script>

<template>
  <div class="chart-container">
    <div class="chart-header">
      <h3>{{ title }}</h3>
      <Space class="toolbox">
        <ExportBtn @click="handleExportImg" />
        <div v-if="typeOptions.length > 0" class="chart-type-switch">
          <template v-for="item in typeOptions" :key="item.type">
            <span
              class="icon-item"
              :class="type === item.type ? 'active' : ''"
              @click="toggleType(item.type)"
            >
              <svg-icon :name="item.icon" size="14" class="icon" />
            </span>
          </template>
        </div>
      </Space>
    </div>
    <div class="chart-body">
      <ChartContent :columns="columns" v-bind="$attrs">
        <template #default="slotProps">
          <slot
            :name="type"
            :title="props.title"
            v-bind="slotProps"
            :get-method="getMethod"
            :get-instance="getInstance"
          ></slot>
        </template>
      </ChartContent>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .chart-container {
    height: 100%;
    width: 100%;
    box-sizing: border-box;

    position: relative;
  }
  .chart-header {
    padding: 12px;
    position: relative;
    height: 24px;
    h3 {
      font-weight: bold;
      color: #7487a7;
      line-height: 24px;
      float: left;
    }
    .toolbox {
      float: right;
    }
    .chart-type-switch {
      display: flex;
      border: 1px solid #7487a7;
      border-radius: 2px;

      .icon-item {
        padding: 4px;
        cursor: pointer;
        line-height: 1;
        .icon {
          color: #7487a7;
        }
        &.active {
          background-color: #7487a7;
          .icon {
            color: #fff;
          }
        }
      }
    }
  }
  .chart-body {
    position: absolute;
    top: 48px;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>
