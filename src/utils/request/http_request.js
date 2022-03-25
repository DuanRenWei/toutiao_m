import axios from 'axios'
import { Toast } from 'vant'
import { baseUrl } from './../../config/config.default'
import ErrorHandler from '../../errors/error_handler'
/**
 * axios 请求库封装
 */
class HttpRequest {
  constructor (baseURL = baseUrl) {
    this.baseURL = baseUrl
    this.queue = {}
  }

  // axios 默认配置
  getInsideConfig () {
    return {
      baseURL: this.baseURL,
      timeout: 1000,
      headers: {}
    }
  }

  // 请求拦截
  interceptors (instance, url) {
    // Add a request interceptor
    instance.interceptors.request.use(config => {
      // 请求成功...
      if (!Object.keys(this.queue).length) {
        // 如果没有请求，添加loading效果
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
      }
      // 防止重复请求
      this.queue[url] = true
      return config
    }, error => {
      // 请求失败...
      return Promise.reject(error)
    })

    // 响应拦截
    instance.interceptors.response.use(response => {
      // 关闭loading && 清空请求队列
      Toast.clear()
      delete this.queue[url]

      // 响应成功，返回数据给组件处理
      const { status, data } = response
      return { status, data }
    }, error => {
      Toast.clear()
      delete this.queue[url]

      // 响应失败，全局错误处理
      ErrorHandler.handler(error)

      return Promise.reject(error)
    })
  }

  // 创建axios实例对象
  createInstance (options = {}) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }

  get (url = '', params = {}) {
    return this.createInstance({
      url,
      method: 'GET',
      params
    })
  }

  post (url = '', data = {}) {
    return this.createInstance({
      url,
      method: 'POST',
      data: {
        ...data
      }
    })
  }

  put (url = '', data = {}) {
    return this.createInstance({
      url,
      method: 'PUT',
      data: {
        ...data
      }
    })
  }

  delete (url = '', params = {}) {
    return this.createInstance({
      url,
      method: 'DELETE',
      params
    })
  }

  patch (url = '', data = {}) {
    return this.createInstance({
      url,
      method: 'PATCH',
      data: {
        ...data
      }
    })
  }
}

export default HttpRequest
