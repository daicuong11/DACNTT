import { AuthResponseType } from '../types/auth.type'

// tokenService.ts
export const getAccessToken = (): string | null => {
  const tokenString = localStorage.getItem('token')
  if (!tokenString) return null
  try {
    const token = JSON.parse(tokenString)
    return token.accessToken || null
  } catch (error) {
    console.error('Error parsing access token:', error)
    return null
  }
}

export const getRefreshToken = (): string | null => {
  const tokenString = localStorage.getItem('token')
  if (!tokenString) return null
  try {
    const token = JSON.parse(tokenString)
    return token.refreshToken || null
  } catch (error) {
    console.error('Error parsing refresh token:', error)
    return null
  }
}

export const setAccessToken = (accessToken: string): void => {
  const tokenString = localStorage.getItem('token')
  const token = tokenString ? JSON.parse(tokenString) : {}
  token.accessToken = accessToken
  localStorage.setItem('token', JSON.stringify(token))
}

export const setRefreshToken = (refreshToken: string): void => {
  const tokenString = localStorage.getItem('token')
  const token = tokenString ? JSON.parse(tokenString) : {}
  token.refreshToken = refreshToken
  localStorage.setItem('token', JSON.stringify(token))
}

export const setToken = (token: AuthResponseType) => {
  localStorage.setItem('token', JSON.stringify(token))
}

export const clearToken = (): void => {
  localStorage.removeItem('token')
}
