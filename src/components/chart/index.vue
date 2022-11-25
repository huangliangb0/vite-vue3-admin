<script lang="ts" setup>
  import { use } from 'echarts/core'
  import { CanvasRenderer } from 'echarts/renderers'
  import { BarChart, LineChart, PieChart } from 'echarts/charts'
  import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    ToolboxComponent,
    GridComponent,
  } from 'echarts/components'
  import VChart from 'vue-echarts'
  // import VChart, { THEME_KEY } from 'vue-echarts'
  // import { provide } from 'vue'

  use([
    CanvasRenderer,
    PieChart,
    LineChart,
    BarChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    ToolboxComponent,
    GridComponent,
  ])

  defineOptions({
    name: 'PieChart',
    components: {
      VChart,
    },
  })

  // provide(THEME_KEY, 'dark')
</script>

<template>
  <v-chart autoresize v-bind="$attrs" />
</template>

<style scoped></style>
