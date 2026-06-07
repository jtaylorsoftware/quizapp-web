import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ID } from 'api/models'
import {
  UserError,
  UserState,
} from './types'

const initialState: UserState = {
  loading: true,
  user: null,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadUser: (state, action: PayloadAction<UserState['user']>) => {
      state.user = action.payload
      state.loading = false
      state.error = null
    },
    deleteQuiz: (state, action: PayloadAction<ID>) => {
      if (!state.user) {
        return
      }
      state.user.quizzes = state.user.quizzes.filter((id) => id !== action.payload)
      state.loading = false
      state.error = null
    },
    changeUserEmail: (state, action: PayloadAction<string>) => {
      if (!state.user) {
        return
      }
      state.user.email = action.payload
      state.loading = false
      state.error = null
    },
    changeUserPassword: (state) => {
      if (!state.user) {
        return
      }
      state.loading = false
      state.error = null
    },
    loadUserError: (state, action: PayloadAction<UserError>) => {
      state.loading = true
      state.user = null
      state.error = action.payload
    },
    changeUserInfoError: (state, action: PayloadAction<UserError>) => {
      state.loading = true
      state.user = null
      state.error = action.payload
    },
    deleteUserError: (state, action: PayloadAction<UserError>) => {
      state.loading = true
      state.user = null
      state.error = action.payload
    },
    logoutUser: (state) => {
      state.loading = true
      state.user = null
      state.error = null
    },
    deleteUser: (state) => {
      state.loading = true
      state.user = null
      state.error = null
    },
    deleteQuizError: (state, action: PayloadAction<UserError>) => {
      state.loading = true
      state.user = null
      state.error = action.payload
    },
  },
})

export const {
  loadUser,
  loadUserError,
  logoutUser,
  deleteQuiz,
  deleteQuizError,
  changeUserPassword,
  changeUserEmail,
  changeUserInfoError,
  deleteUser,
  deleteUserError,
} = userSlice.actions

export default userSlice.reducer
