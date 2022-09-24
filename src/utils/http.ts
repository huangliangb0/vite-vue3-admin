import { message } from 'ant-design-vue'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { getToken } from './auth'

export interface ResponseResult<T> {
  code: number
  data: T
  msg: string
}

export interface RequestConfig {
  /** 是否直接获取data，而忽略code、message等 */
  isDirectly?: boolean
}

class HttpRequest {
  public baseUrl = import.meta.env.VITE_BASE_API ?? '/'
  public timeout = 5000

  public init(options: AxiosRequestConfig) {
    const instance = axios.create()

    options = this.mergeOptions(options)

    this.setInterceptors(instance)

    return instance(options)
  }

  // 拦截器
  setInterceptors(instance: AxiosInstance) {
    // 请求拦截
    instance.interceptors.request.use(
      (config) => {
        const token = getToken()
        if (token && config.headers) {
          // 请求头token信息，请根据实际情况进行修改
          config.headers['token'] = token
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    // 响应拦截
    instance.interceptors.response.use(
      (res) => {
        const { code } = res.data
        if (code !== 0) {
          return Promise.reject(res)
        }
        return res
      },
      (error) => {
        // 处理 422 或者 500 的错误异常提示
        const errMsg = error?.response?.data?.message ?? '未知错误，请重试'
        message.error(errMsg)
        error.message = errMsg
        return Promise.reject(error)
      },
    )
  }

  mergeOptions(options: AxiosRequestConfig) {
    return Object.assign(
      {
        baseUrl: this.baseUrl,
        timeout: this.timeout,
      },
      {
        ...options,
      },
    )
  }

  public async request<T = any>(
    options: AxiosRequestConfig,
    config: RequestConfig = {},
  ) {
    try {
      const { isDirectly = true } = config
      const res = await this.init(options)
      if (isDirectly) {
        return res.data.data as T
      }
      return res.data as ResponseResult<T>
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public get<T = any>(options: AxiosRequestConfig, config?: RequestConfig) {
    return this.request<T>(
      {
        method: 'GET',
        ...options,
      },
      config,
    )
  }
  public post<T = any>(options: AxiosRequestConfig, config?: RequestConfig) {
    return this.request<T>(
      {
        method: 'POST',
        ...options,
      },
      config,
    )
  }
  public put<T = any>(options: AxiosRequestConfig, config?: RequestConfig) {
    return this.request<T>(
      {
        method: 'PUT',
        ...options,
      },
      config,
    )
  }
  public patch<T = any>(options: AxiosRequestConfig, config?: RequestConfig) {
    return this.request<T>(
      {
        method: 'PATCH',
        ...options,
      },
      config,
    )
  }
  public delete<T = any>(options: AxiosRequestConfig, config?: RequestConfig) {
    return this.request<T>(
      {
        method: 'DELETE',
        ...options,
      },
      config,
    )
  }
}

export default new HttpRequest()
