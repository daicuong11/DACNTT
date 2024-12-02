import axios from 'axios'
import { getAccessToken, getRefreshToken, setAccessToken } from './auth_helper'
import { data } from 'react-router-dom'
import { BaseResponse } from '../types/auth.type'

const baseUrl: string = import.meta.env.VITE_API_BASE_URL || ''

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000
})

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken()
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => (response.data ? response.data : response),
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry && getRefreshToken()) {
      originalRequest._retry = true

      try {
        const refreshToken = getRefreshToken()
        const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/refresh-token`, {
          refreshToken
        })

        setAccessToken(data.accessToken)

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError)
        localStorage.removeItem('token')
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
