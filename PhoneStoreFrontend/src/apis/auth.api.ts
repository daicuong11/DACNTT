import { AuthResponseType } from '../types/auth.type'
import { UserType } from '../types/user.type'
import http from '../utils/http'

const getAuthHeaders = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export const loginWithEmailAndPassword = async (email: string, password: string): Promise<AuthResponseType> => {
  try {
    const response = await http.post<AuthResponseType>('/auth/login', { email, password })
    return response.data
  } catch (error) {
    console.error('Error logging in:', error)
    throw error
  }
}

// Xác minh token
export const verifyToken = async (token: string): Promise<UserType> => {
  try {
    const response = await http.post<UserType>('/auth/verify', {}, getAuthHeaders(token))
    return response.data
  } catch (error) {
    console.error('Error verifying token:', error)
    throw error
  }
}
