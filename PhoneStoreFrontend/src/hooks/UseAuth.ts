import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentUser, clearCurrentUser } from '../features/auth/auth.slice'
import axios from 'axios'
import { useAppSelector } from '.'
import { UserAuthType } from '../types/user.type'
import { useVerifyToken } from '../querys/auth/useVerifyToken'

interface AuthState {
  isLoading: boolean
  isAuthenticated: boolean
  currentUser: UserAuthType | null
  error: string | null
}

const PrivateRoute = (): AuthState => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { currentUser } = useAppSelector((state) => state.auth)
  const dispatch = useDispatch()

  // Kiểm tra token
  const accessToken = localStorage.getItem('phone_store_token')
  const verifyTokenQuery = useVerifyToken(accessToken || '')

  useEffect(() => {
    const authenticateUser = async () => {
      setIsLoading(true)
      setError(null)

      if (accessToken) {
        if (verifyTokenQuery.isSuccess) {
          // Nếu token hợp lệ, cập nhật currentUser
          dispatch(setCurrentUser(verifyTokenQuery.data))
          setIsAuthenticated(true)
        } else if (verifyTokenQuery.isError) {
          // Nếu token không hợp lệ
          console.error('AccessToken invalid or expired:', verifyTokenQuery.error)
          setError('Access token is invalid or expired.')
        }
      } else {
        // Bước 2: Kiểm tra refreshToken
        try {
          const refreshTokenResponse = await axios.post('/api/refresh-token', null, { withCredentials: true })
          const newAccessToken = refreshTokenResponse.data.accessToken
          localStorage.setItem('authToken', newAccessToken)

          const retryResponse = await axios.get('/api/user', {
            headers: { Authorization: `Bearer ${newAccessToken}` }
          })

          dispatch(setCurrentUser(retryResponse.data))
          setIsAuthenticated(true)
        } catch (refreshError: any) {
          console.error('RefreshToken invalid or expired:', refreshError)
          setError('Unable to refresh token. Please log in again.')

          dispatch(clearCurrentUser())
          setIsAuthenticated(false)
        }
      }
      setIsLoading(false)
    }

    authenticateUser()
  }, [
    accessToken,
    dispatch,
    verifyTokenQuery.isSuccess,
    verifyTokenQuery.isError,
    verifyTokenQuery.data,
    verifyTokenQuery.error
  ])

  return { isLoading, isAuthenticated, currentUser, error }
}

export default PrivateRoute
