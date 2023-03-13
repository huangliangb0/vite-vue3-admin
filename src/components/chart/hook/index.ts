/*
 * @Description:
 * @Date: 2022-07-08 15:28:08
 * @LastEditTime: 2022-07-08 17:24:29
 * @FilePath: \spvr-plat-web\src\components\business\charts\hook\index.ts
 */
import { ref, ComputedRef } from 'vue'
import type { ECharts, EChartsCoreOption } from 'echarts'

interface Props {
  option: ComputedRef<EChartsCoreOption>
  title?: string
}

export const useChartHook = (props: Props) => {
  const myChart = ref<ECharts>()

  // 重绘图表
  function resetChart() {
    myChart.value?.clear()
    myChart.value?.setOption(props.option.value, true)
  }

  // title 下载图片名称
  const exportImg = () => {
    console.log('myChart.value', myChart.value)
    if (!myChart.value) {
      return
    }
    console.log(2222)
    const img = new Image()
    img.src = myChart.value.getDataURL({
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

  return {
    myChart,
    resetChart,
    exportImg,
  }
}
