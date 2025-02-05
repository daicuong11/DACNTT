import { setAuth } from '@/features/auth/auth.slice'
import { store } from '@/store'
import { AuthResponseType, BaseResponse } from '@/types/auth.type'
import axios from 'axios'

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL || ''

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000
})

export const getToken = (): AuthResponseType | null => {
  const state = store.getState()
  return state.auth.token || null
}

// Function to set token to Redux store
export const setToken = (token: AuthResponseType) => {
  store.dispatch(setAuth(token))
}

// Function to refresh token
const refreshToken = async () => {
  const tokenData = getToken()
  if (!tokenData?.refreshToken) return null

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
      refreshToken: tokenData.refreshToken
    })
    const newToken = response.data
    setToken(newToken)
    return newToken.accessToken
  } catch (error) {
    console.error('Refresh token failed:', error)
    localStorage.removeItem('token')
    return null
  }
}

// Request interceptor to attach token
axiosInstance.interceptors.request.use(
  async (config) => {
    const tokenData = getToken()
    if (tokenData?.accessToken) {
      config.headers.Authorization = `Bearer ${tokenData.accessToken}`
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
