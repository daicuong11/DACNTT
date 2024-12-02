import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserAuthType } from '../../types/user.type'
import { AuthResponseType } from '../../types/auth.type'
import { clearToken, setToken } from '../../utils/auth_helper'

export interface AuthState {
  currentUser: UserAuthType | null
}

const initialState: AuthState = {
  currentUser: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthResponseType>) => {
      state.currentUser = action.payload.user
      setToken(action.payload)
    },
    clearAuth: (state) => {
      state.currentUser = null
      clearToken()
    }
  }
})

export const { setAuth, clearAuth } = authSlice.actions

export const selectAuth = (state: { auth: AuthState }) => state.auth.currentUser

export default authSlice.reducer
