import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

class Http {
  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: 'https://localhost:7130/api/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // // Interceptor cho request
    // this.instance.interceptors.request.use(
    //   (config: InternalAxiosRequestConfig) => {
    //     const token = localStorage.getItem('token') // Lấy accessToken từ localStorage
    //     if (token) {
    //       config.headers.Authorization = `Bearer ${token}`
    //     }
    //     return config
    //   },
    //   (error) => Promise.reject(error)
    // )

    // // Interceptor cho response
    // this.instance.interceptors.response.use(
    //   (response: AxiosResponse) => response.data,
    //   async (error) => {
    //     const originalRequest = error.config
    //     if (error.response?.status === 401 && !originalRequest._retry) {
    //       originalRequest._retry = true
    //       try {
    //         const newAccessToken = await refreshToken()
    //         axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`
    //         originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
    //         return axios(originalRequest) // Gửi lại request gốc với token mới
    //       } catch (refreshError) {
    //         return Promise.reject(refreshError)
    //       }
    //     }
    //     return Promise.reject(error)
    //   }
    // )
  }
}

const http = new Http().instance

export default http

// Hàm làm mới token
const refreshToken = async () => {
  try {
    const refreshToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('refreshToken='))
      ?.split('=')[1]
    if (!refreshToken) {
      throw new Error('Refresh token not found in cookies.')
    }
    const response = await axios.post('https://localhost:7130/api/auth/refresh-token', {
      token: refreshToken
    })
    const newAccessToken = response.data.accessToken
    localStorage.setItem('token', newAccessToken) // Lưu accessToken mới
    return newAccessToken
  } catch (error) {
    console.error('Failed to refresh token:', error)
    throw error
  }
}
