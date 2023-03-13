<script setup lang="ts">
  import Chart from '..'
  import { ECOption } from '../type'
  const props = defineProps({
    data: {
      type: Array as PropType<Array<{ name: string; value: number }>>,
      default: () => [],
    },

    option: {
      type: Object as PropType<ECOption>,
      default: () => ({}),
    },
    title: String,
  })

  const option = computed(() => {
    return {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: props.title,
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: props.data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    } as ECOption
  })
</script>

<template>
  <Chart :option="option" v-bind="$attrs" />
</template>

<style scoped></style>
