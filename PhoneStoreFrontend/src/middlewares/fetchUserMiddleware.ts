// app/middleware/fetchUserMiddleware.ts
import { Middleware } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { setTokens, setUser } from '@/features/auth/auth.slice'
import { BaseResponse } from '@/types/auth.type'
import { UserType } from '@/types/user.type'
import axiosInstance from '@/configs/http'

export const fetchUserMiddleware: Middleware<{}, RootState> = (store) => (next) => async (action: any) => {
  const result = next(action)

  // Kiểm tra nếu action là setTokens (accessToken thay đổi)
  if (action.type === setTokens.type) {
    const { accessToken } = store.getState().auth

    if (accessToken) {
      try {
        // Gọi API để fetch thông tin người dùng
        const response: BaseResponse<UserType> = await axiosInstance.get('auth/verify')
        if (response.success) {
          store.dispatch(setUser(response.data))
        } else {
          console.error('Failed to fetch user')
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }
  }

  return result
}
