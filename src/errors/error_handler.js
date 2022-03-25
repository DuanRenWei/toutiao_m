import { Toast } from 'vant'
/**
 * 全局错误处理
 * @param {*} error
 */
export default class ErrorHandler {
  static handler (error) {
    if (error && error.response) {
      ErrorHandler.statusCodeHandler(error.response.status, error.response)
    } else {
      Toast.fail('服务器连接失败！')
    }
  }

  /**
   * 状态码处理
   * @param {*} status
   * @param {*} response
   */
  static statusCodeHandler (status, response) {
    switch (status) {
      case 400:
        Toast.fail(response.data.errmsg)
        break
      case 401:
        Toast.fail('未授权，请重新登录')
        break
      case 403:
        Toast.fail('拒绝访问')
        break
      case 404:
        Toast.fail('请求出错')
        break
      case 408:
        Toast.fail('请求超时')
        break
      case 422:
        Toast.fail('请求参数不正确')
        break
      case 500:
        Toast.fail('服务器错误 500')
        break
      case 501:
        Toast.fail('服务未实现 501')
        break
      case 502:
        Toast.fail('网络错误 502')
        break
      case 503:
        Toast.fail('服务不可用 503')
        break
      case 504:
        Toast.fail('服务超时')
        break
      case 505:
        Toast.fail('HTTP版本不受支持 505')
        break
      default:
        Toast.fail(`连接出错（${response.status}）`)
    }
  }
}
