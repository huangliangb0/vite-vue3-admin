<script lang="ts" setup>
  import { ECharts, use } from 'echarts/core'
  import { CanvasRenderer } from 'echarts/renderers'
  import { BarChart, LineChart, PieChart, CustomChart } from 'echarts/charts'
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
    CustomChart,
  ])

  defineOptions({
    name: 'Chart',
    components: {
      VChart,
    },
  })

  const props = defineProps({
    title: String,
    width: {
      type: Number,
      default: 100,
    },
    height: {
      type: Number,
      default: 100,
    },
    getInstance: {
      type: Function as PropType<(e?: ECharts) => void>,
    },
    getMethod: {
      type: Function as PropType<(arg: { exportImg: () => void }) => void>,
    },
  })

  const instance = ref<ECharts>()

  const style = computed(() => {
    return {
      width: props.width + 'px',
      height: props.height + 'px',
    }
  })

  // title 下载图片名称
  const exportImg = () => {
    if (!instance.value) {
      return
    }
    const img = new Image()
    img.src = instance.value.getDataURL({
      type: 'png',
      pixelRatio: 1, //放大2倍
      backgroundColor: '#fff',
    })

    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width || 200
      canvas.height = img.height || 200
      const ctx = canvas.getContext('2d')
      ctx!.drawImage(img, 0, 0)
      const dataURL = canvas.toDataURL('image/png')

      const a = document.createElement('a')
      // 创建一个单击事件
      const event = new MouseEvent('click')
      // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
      a.download = props.title || '下载图片名称'
      // 将生成的URL设置为a.href属性
      a.href = dataURL
      // 触发a的单击事件
      a.dispatchEvent(event)
    }
  }

  onMounted(() => {
    props.getInstance?.(instance.value)
    props.getMethod?.({
      exportImg,
    })
  })

  defineExpose({
    exportImg,
  })

  // provide(THEME_KEY, 'dark')
</script>

<template>
  <v-chart ref="instance" autoresize :style="style" v-bind="$attrs" />
</template>

<style scoped></style>
