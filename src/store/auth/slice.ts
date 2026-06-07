import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  AuthState,
  Token,
} from './types'

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<Token>) => {
      state.token = action.payload
      state.isAuthenticated = true
    },
    clearAuthUser: (state) => {
      state.token = null
      state.isAuthenticated = false
    },
  },
})

export const { setAuthUser, clearAuthUser } = authSlice.actions
export default authSlice.reducer
