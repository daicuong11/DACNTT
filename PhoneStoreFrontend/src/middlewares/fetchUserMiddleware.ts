import { Middleware } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { clearAuth, setTokens, setUser } from '@/features/auth/auth.slice'
import { BaseResponse } from '@/types/auth.type'
import { UserType } from '@/types/user.type'
import axiosInstance from '@/configs/http'

const fetchUser = async (dispatch: any) => {
  try {
    const response: BaseResponse<UserType> = await axiosInstance.get('auth/verify')
    if (response.success) {
      dispatch(setUser(response.data))
    } else {
      console.error('Failed to fetch user')
      dispatch(clearAuth())
    }
  } catch (error) {
    console.error('Error fetching user:', error)
    dispatch(clearAuth())
  }
}

export const fetchUserMiddleware: Middleware<{}, RootState> = (store) => (next) => (action: any) => {
  const result = next(action)

  if (action.type === setTokens.type) {
    const { accessToken } = store.getState().auth
    if (accessToken) {
      fetchUser(store.dispatch) // Gọi hàm fetch bên ngoài
    }
  }

  return result
}
