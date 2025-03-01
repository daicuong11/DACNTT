// utils/axiosInstance.ts
import { clearAuth, setTokens as setAuth } from '@/features/auth/auth.slice'
import { navigate } from '@/utils/navigation'
import { Modal } from 'antd'
import axios from 'axios'

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL || ''

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 20000
})

let store: any // Khai báo biến store nhưng chưa gán ngay

// Hàm inject store (Gọi từ index.tsx sau khi store được tạo)
export const injectStore = (_store: any) => {
  store = _store
}

// Helper functions to get tokens from store
export const getAccessToken = (): string | null => {
  return store?.getState()?.auth?.accessToken || null
}

export const getRefreshToken = (): string | null => {
  return store?.getState()?.auth?.refreshToken || null
}

// Function to set tokens in store
export const setTokens = (token: { accessToken: string; refreshToken: string }) => {
  store.dispatch(setAuth(token))
}

export const clearTokens = () => {
  store.dispatch(clearAuth())
}

// Refresh token logic
let isRefreshing = false
let refreshSubscribers: ((token: string) => void)[] = []

const refreshToken = async () => {
  if (isRefreshing) {
    return new Promise<string>((resolve) => {
      refreshSubscribers.push((token) => resolve(token))
    })
  }

  isRefreshing = true
  const refreshTokenData = getRefreshToken()
  if (!refreshTokenData) return null

  try {
    const response = await axiosInstance.post('/auth/refresh', { refreshToken: refreshTokenData })
    const newToken = response.data
    setTokens(newToken)

    isRefreshing = false
    refreshSubscribers.forEach((cb) => cb(newToken.accessToken))
    refreshSubscribers = []

    return newToken.accessToken
  } catch (error) {
    console.error('Refresh token failed:', error)
    clearTokens()
    isRefreshing = false
    refreshSubscribers = []
    return null
  }
}

// Request interceptor to attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const tokenData = getAccessToken()
    if (tokenData) {
      config.headers.Authorization = `Bearer ${tokenData}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    // const originalRequest = error.config
    // if (error.response?.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true
    //   const newAccessToken = await refreshToken()
    //   if (newAccessToken) {
    //     originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
    //     return axiosInstance(originalRequest)
    //   }
    // }
    console.log('Error:', error)
    if (error.response?.status === 401) {
      Modal.confirm({
        title: 'Phiên đăng nhập đã hết hạn',
        content: 'Bạn có muốn đăng nhập lại không?',
        okText: 'Đăng nhập lại',
        cancelText: 'Hủy',
        onOk: () => {
          store.dispatch(clearAuth()) // Xóa Redux state
          // navigate('/signin') // Chuyển về trang đăng nhập
          window.location.href = '/signin' // Chuyển về trang đăng nhập
        }
      })
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
