import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { ChartType } from '../type'
interface Props {
  type?: ChartType
  // 是否显示缩放滚动条
  isShowDataZoom?: Boolean
  // 是否是 MultiBarLineChart
  isMulti?: Boolean
  data: any[]
}

const useChartWidth = (props: Props) => {
  const chartWrap = ref<HTMLDivElement>()

  const style = ref({
    width: '100%',
  })

  return {
    chartWrap,
    style,
  }
}

export default useChartWidth
