<script lang="ts" setup>
  import { computed } from 'vue'
  import { Spin } from 'ant-design-vue'
  import { ChartDataType } from './type'
  import { debounce } from 'lodash-es'
  defineOptions({
    inheritAttrs: false,
  })
  const props = defineProps({
    columns: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    fieldNames: {
      type: Object as PropType<{ name: string; value: string }>,
      default: () => ({ name: 'name', value: 'value' }),
    },
    loading: Boolean,
  })

  const contentRef = ref<HTMLDivElement>()
  const width = ref(0)
  const height = ref(0)

  const isEmptyData = computed(() => props.columns.length === 0)

  const data = computed<ChartDataType>(() =>
    props.columns.map((item, index) => ({
      name: item[props.fieldNames.name] || index.toFixed(),
      value: item[props.fieldNames.value] || 0,
    })),
  )

  onMounted(() => {
    width.value = contentRef.value?.clientWidth || 0
    height.value = contentRef.value?.clientHeight || 0
  })

  const setSize = debounce(() => {
    console.log('contentRef.value?.clientWidth', contentRef.value?.clientWidth)
    width.value = contentRef.value?.clientWidth || 0
    height.value = contentRef.value?.clientHeight || 0
  }, 300)

  onMounted(() => {
    window.addEventListener('resize', setSize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', setSize)
  })
</script>

<template>
  <div class="chart-content" ref="contentRef">
    <Spin
      :spinning="loading"
      tip="数据加载中..."
      style="width: 100%; height: calc(100vh)"
    >
      <div v-if="!isEmptyData" ref="chartWrap">
        <slot
          :data="data"
          :width="width"
          :height="height"
          v-bind="$attrs"
        ></slot>
      </div>
      <div v-else class="no-data-hint">
        <Empty size="small" />
      </div>
    </Spin>
  </div>
</template>

<style lang="less" scoped>
  .chart-content {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .no-data-hint {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 16px;
      color: #dee211;
    }
  }
</style>
