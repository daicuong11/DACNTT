import { AuthResponseType } from './../../types/auth.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  token: AuthResponseType | null
}

const initialState: AuthState = {
  token: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthResponseType>) => {
      state.token = action.payload
    },
    clearAuth: (state) => {
      state.token = null
    }
  }
})

export const { setAuth, clearAuth } = authSlice.actions

export const selectAuth = (state: { auth: AuthState }) => state.auth.token

export default authSlice.reducer
