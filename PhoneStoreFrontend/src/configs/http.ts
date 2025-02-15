// utils/axiosInstance.ts
import axios from 'axios'
import { store } from '../store'
import { clearAuth, setTokens } from '@/features/auth/auth.slice'
const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL || ''

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 20000
})

// Helper functions to get tokens from Redux store
export const getAccessToken = (): string | null => {
  const state = store.getState()
  return state.auth.accessToken || null
}

export const getRefreshToken = (): string | null => {
  const state = store.getState()
  return state.auth.refreshToken || null
}

// Function to set tokens to Redux store
export const setToken = (token: { accessToken: string; refreshToken: string }) => {
  store.dispatch(setTokens(token))
}

// Variables to handle refresh token race condition
let isRefreshing = false
let refreshSubscribers: ((token: string) => void)[] = []

// Function to refresh token
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
    const response = await axiosInstance.post('/auth/refresh', {
      refreshToken: refreshTokenData
    })
    const newToken = response.data
    setToken(newToken)
    isRefreshing = false
    refreshSubscribers.forEach((cb) => cb(newToken.accessToken))
    refreshSubscribers = []
    return newToken.accessToken
  } catch (error) {
    console.error('Refresh token failed:', error)
    localStorage.removeItem('token')
    store.dispatch(clearAuth())
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
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const newAccessToken = await refreshToken()
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return axiosInstance(originalRequest)
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
