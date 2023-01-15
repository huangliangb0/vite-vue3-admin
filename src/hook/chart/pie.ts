import { h, isRef, type Ref, ref, computed } from 'vue'
import Chart from '@/components/chart/index.vue'
import { ECOption } from '@/components/chart'
type Props = {
  label: Ref<string[]> | string[]
  data:
    | Ref<Array<{ value: number; name: string }>>
    | Array<{ value: number; name: string }>
  options?: ECOption
  loading?: boolean
}

const CHART_Type = 'pie'

const usePieChart = (props: Partial<Props>) => {
  const { data, label, options, loading: _loading = true, ...reset } = props

  const o = computed(() => {
    return Object.assign(
      {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: isRef(label) ? label.value : label,
        },
        series: [
          {
            name: 'Traffic Sources',
            type: CHART_Type,
            radius: '55%',
            center: ['50%', '60%'],
            data: isRef(data) ? data.value : data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
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
  const PieChart = (
    _props: Partial<Props>,
    {
      attrs,
    }: {
      attrs?: Partial<Props>
    },
  ) => {
    return h(Chart, {
      name: 'Pie',
      loading: loading.value,
      option: o.value,
      ...reset,
      ...attrs,
    })
  }

  return {
    PieChart,
    done,
  }
}

export default usePieChart
