import axios from './../utils/request'

// 用户登录
export const userLogin = data => axios.post('/api/v1/auth/login', data)
// 获取验证码
export const getCode = data => axios.post('/api/v1/auth/get_code', data)
