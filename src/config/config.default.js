// api 默认请求地址 注意：如何设置了代理跨域， : 号后面填 '' 字符串 否则填写服务器api地址
export const baseUrl = process.env.NODE_ENV === 'production' ? 'https://pro.com' : ''
