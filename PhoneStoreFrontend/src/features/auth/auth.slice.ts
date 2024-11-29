import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserAuthType, UserType } from '../../types/user.type'

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
    setCurrentUser: (state, action: PayloadAction<UserAuthType>) => {
      state.currentUser = action.payload
    },
    clearCurrentUser: (state) => {
      state.currentUser = null
    }
  }
})

export const { setCurrentUser, clearCurrentUser } = authSlice.actions

export const selectAuth = (state: { auth: AuthState }) => state.auth.currentUser

export default authSlice.reducer
