import axios from './../utils/request'

// 获取所有分类
export const getAllCategory = () => axios.get('/api/v1/category')

// 获取文章列表
export const getArticleLists = params => axios.get('/api/v1/article', params)
