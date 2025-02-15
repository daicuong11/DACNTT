// features/authSlice.ts
import { UserType } from '@/types/user.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: UserType | null
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload
    },
    clearAuth: (state) => {
      state.accessToken = null
      state.refreshToken = null
      state.user = null
    }
  }
})

export const { setTokens, setUser, clearAuth } = authSlice.actions

export default authSlice.reducer
