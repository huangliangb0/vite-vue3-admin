import { onMounted, reactive, toRaw, toRefs, UnwrapRef } from 'vue'
import { RequestConfig } from '@/utils/http'
import axios from 'axios'
const CancelToken = axios.CancelToken

interface State<T> {
  data: T | undefined // 异步请求的数据 如果没有数据  则为undefined
  loading: boolean // 异步请求是否在进行中
  error: any // 异步请求出错的信息
}

// 初始值配置
interface Config extends RequestConfig {
  // 当前页
  current?: number
  // 分页大小
  pageSize?: number
  // 初始值
  initState?: unknown
  // 延迟
  delay?: number
}

/**
 * 用于异步查询
 * @param api       接口
 * @param params    接口参数
 * @param config    其它配置，比如初始值 initState, 或者接口的其它配置（RequestOptions）
 *
 */
export function useAsync<T = unknown>(
  api: (params: Recordable, config: RequestConfig) => Promise<T>,
  params?: Recordable,
  config: Config = {},
  done?: () => void,
) {
  const { initState, delay = 0 } = config
  const result = reactive<State<T>>({
    data: initState ? (initState as T) : undefined,
    loading: false,
    error: undefined,
  })
  const cancel = ref<undefined | (() => void)>(undefined)

  const run = async (pms?: Recordable, conf: Recordable = {}) => {
    result.loading = true
    try {
      if (delay > 0) {
        await new Promise((resolve) =>
          setTimeout(() => {
            resolve(null)
          }, delay),
        )
      }
      const data = await api(Object.assign({}, params, pms), {
        cancelToken: new CancelToken(function executor(c) {
          // 参数 c 也是个函数
          cancel.value = c
        }),
        ...config,
        ...conf,
      })
      result.data = data as UnwrapRef<T>
      result.error = undefined
      return data
    } catch (err) {
      result.error = err
    } finally {
      result.loading = false
      done?.()
    }
  }
  return {
    ...toRefs(result),
    cancel,
    run,
  }
}

export const useMountedQuery = <T>(
  api: (params: Recordable, config: RequestConfig) => Promise<T>,
  params?: Recordable,
  config: Config = {},
) => {
  const result = useAsync<T>(api, params, config)

  onMounted(() => {
    result.run()
  })

  return result
}

/**
 * 用于分页数据查询
 */
export const useQueryWithPagination = <T>(
  api: (params: Recordable, config: RequestConfig) => Promise<T>,
  params?: Recordable,
  config: Config = {},
  done?: () => void,
) => {
  const { current = 1, pageSize = 10 } = config

  const pagination = reactive<PaginationType>({
    current: current,
    pageSize: pageSize,
    total: 100,
  })

  const { data, loading, error, run, cancel } = useAsync(
    api,
    {
      size: pagination.pageSize,
      page: pagination.current,
      ...params,
    },
    {
      ...config,
    },
    done,
  )

  const reload = () =>
    run({
      ...toRaw(params),
      page: pagination.current,
      size: pagination.pageSize,
    })

  const onPageChange = (value: PaginationType) => {
    Object.assign(pagination, value)
  }

  watchEffect((invalid) => {
    run({
      ...params,
      size: pagination.pageSize,
      page: pagination.current,
    })
    invalid(() => {
      cancel.value?.()
    })
  })

  return {
    loading,
    error,
    pagination,
    run,
    reload,
    data: data as UnwrapRef<T>,
    onPageChange,
  }
}
