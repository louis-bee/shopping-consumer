import axios from 'axios'
import user from '@/api/modules/user'
import clearStorage from '@/utils/clearStorage'

const request = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 10000
})

// 添加请求拦截器
request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(async (response) => {
  // 2xx 范围内的状态码都会触发该函数
  if (response.data && response.data.data && response.data.data.token !== undefined) {
    localStorage.setItem('token', response.data.data.token)
  }
  if (response.data && response.data.data && response.data.data.refreshToken !== undefined) {
    localStorage.setItem('refreshToken', response.data.data.refreshToken)
  }
  if (response.data.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken) {
      alert('登录已过期，请重新登录')
      window.location.href = '/login'
    }
    // 刷新token
    const params = {
      refreshToken: refreshToken,
      userId: JSON.parse(localStorage.getItem('userInfo')).id
    }
    const resr = await user.refreshToken(params)
    if (resr.status === 402) { // 防止长token过期后的死循环
      return
    }
    // 重新请求
    response.config.headers.Authorization = localStorage.getItem('token') // 用新token
    const res = await request.request(response.config)
    return res
  }
  if (response.data.status === 402) {
    clearStorage()
    alert('登录已过期，请重新登录')
    window.location.href = '/login'
    return
  }
  // 对响应数据做点什么
  return response.data
}, (error) => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  // if (error.response.status === 401) {

  // }
  return Promise.reject(error)
})

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get (url, params) {
  return new Promise((resolve, reject) => {
    request.get(url, {
      params: params
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post (url, params) {
  return new Promise((resolve, reject) => {
    request.post(url, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
