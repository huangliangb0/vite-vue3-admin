import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { message as $message } from 'ant-design-vue'
// import useUserStore  from '@/store/modules/user'
import { getToken } from './auth'

export interface RequestOptions {
  /** 是否直接获取data，而忽略code、message等 */
  isDirectly?: boolean
  /** 请求成功是提示信息 */
  successMsg?: string
  /** 请求失败是提示信息 */
  errorMsg?: string
  /** 是否mock数据请求 */
  isMock?: boolean
  /** 是否提示错误信息 */
  isErr?: boolean
}

type Config = AxiosResponse['config'] & {
  isErr?: boolean
}

type ResponseType = Omit<AxiosResponse, 'config'> & {
  config: Config
}

const UNKNOWN_ERROR = '未知错误，请重试'

/** 真实请求的路径前缀 */
const baseApiUrl = import.meta.env.VITE_BASE_API
/** mock请求路径前缀 */
const baseMockUrl = import.meta.env.VITE_MOCK_API

const service = axios.create({
  // baseURL: baseApiUrl,
  timeout: 6000,
})

service.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token && config.headers) {
      // 请求头token信息，请根据实际情况进行修改
      config.headers['token'] = token
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)
service.interceptors.response.use(
  (response: ResponseType) => {
    const res = response.data
    return res

    // if the custom code is not 200, it is judged as an error.
    // if (res.code !== 0) {
    //   // Illegal token
    //   if (res.code === 401) {
    //     $message.destroy()
    //     $message.warning({
    //       content: '登录已过期，即将返回登录页',
    //       onClose: () => {
    //         window.localStorage.clear()
    //         window.location.reload()
    //       },
    //     })
    //   } else {
    //     if (response.config.isErr) $message.error(res.msg || UNKNOWN_ERROR)
    //   }

    //   // throw other
    //   const error = new Error(res.msg || UNKNOWN_ERROR) as Error & { code: any }
    //   error.code = res.code
    //   return Promise.reject(error)
    // } else {
    //   return res
    // }
  },
  (error) => {
    // 处理 422 或者 500 的错误异常提示
    const errMsg = error?.response?.data?.message ?? UNKNOWN_ERROR
    $message.destroy()
    $message.error(errMsg)
    error.message = errMsg
    return Promise.reject(error)
  },
)

export type Response<T = any> = {
  code: number
  message: string
  data: T
}

export type BaseResponse<T = any> = Promise<Response<T>>

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
export const request = async <T = any>(
  config: AxiosRequestConfig & {
    isErr?: boolean
  },
  options: RequestOptions = {},
): Promise<T> => {
  try {
    const { isErr = true } = config
    const { successMsg, errorMsg, isMock, isDirectly = true } = options

    const fullUrl = `${
      (isMock ? baseMockUrl : (config as any).baseApiUrl || baseApiUrl) +
      config.url
    }`
    config.url = fullUrl.replace(/(?<!:)\/{2,}/g, '/')
    // @ts-ignore
    const res = await service.request({ ...config, isErr })
    successMsg && $message.success(successMsg)
    errorMsg && $message.error(errorMsg)
    // return isDirectly ? res.data : res
    return res
  } catch (error: any) {
    return Promise.reject(error)
  }
}
