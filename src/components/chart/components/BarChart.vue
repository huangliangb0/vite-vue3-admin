<script setup lang="ts">
  import Chart from '..'
  import { ChartDataType, ECOption } from '../type'
  const props = defineProps({
    data: {
      type: Array as PropType<ChartDataType>,
      default: () => [],
    },

    option: {
      type: Object as PropType<ECOption>,
      default: () => ({}),
    },
  })

  const labels = computed(() => props.data.map((item) => item.name))
  const values = computed(() => props.data.map((item) => item.value))

  const option = computed(() => {
    return {
      xAxis: {
        type: 'category',
        data: labels.value,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          type: 'bar',
          data: values.value,
        },
      ],
    } as ECOption
  })
</script>

<template>
  <Chart :option="option" v-bind="$attrs" />
</template>

<style scoped></style>
