import axios from './../utils/request'

// 用户登录
export const userLogin = data => axios.post('/api/v1/auth/login', data)
// 获取验证码
export const getCode = data => axios.post('/api/v1/auth/get_code', data)
// 退出登录
export const logout = () => axios.delete('/api/v1/auth/logout')
// 刷新 token
export const refresh = () => axios.put('/api/v1/auth/refresh')
// 获取用户信息
export const getUserInfo = () => axios.get('/api/v1/auth/user_info')
