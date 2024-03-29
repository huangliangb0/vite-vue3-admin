import { h, isRef, type Ref, ref, computed } from 'vue'
import Chart from '@/components/chart/index.vue'
import { ECOption } from '@/components/chart'
type Props = {
  label: Ref<string[]> | string[]
  data: Ref<Array<number>> | Array<number>
  options?: ECOption
  loading?: boolean
}

const CHART_Type = 'bar'

const useBarChart = (props: Partial<Props>) => {
  const { data, label, options, loading: _loading = true, ...reset } = props

  const o = computed(() => {
    return Object.assign(
      {
        xAxis: {
          type: 'category',
          data: isRef(label) ? label.value : label,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            type: CHART_Type,
            data: isRef(data) ? data.value : data,
          },
        ],
      },
      options,
    )
  })

  const loading = ref(_loading)

  // 数据加载完成
  const done = (cb?: (arg?: any) => void) => {
    loading.value = false
    cb && cb()
  }

  /***** render 或者 component **********/
  const BarChart = (
    _props: Partial<Props>,
    {
      attrs,
    }: {
      attrs?: Partial<Props>
    },
  ) => {
    return h(Chart, {
      loading: loading.value,
      option: o.value,
      ...reset,
      ...attrs,
    })
  }

  return {
    BarChart,
    done,
  }
}

export default useBarChart
