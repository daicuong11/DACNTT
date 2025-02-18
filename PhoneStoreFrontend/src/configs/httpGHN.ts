import axios from 'axios'

const API_BASE_URL: string = import.meta.env.VITE_API_GHN_BASE_URL || ''
const GHN_TOKEN: string = import.meta.env.VITE_GHN_TOKEN || ''
const GHN_SHOP_ID: string = import.meta.env.VITE_GHN_SHOP_ID || ''

const axiosGHN = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Token: GHN_TOKEN,
    ShopId: GHN_SHOP_ID
  }
})

// Request Interceptor
axiosGHN.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response Interceptor
axiosGHN.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosGHN
