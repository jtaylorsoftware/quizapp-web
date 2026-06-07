import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Alert, AlertId, AlertState } from './types'

const initialState: AlertState = []

const alertSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<Alert>) => {
      state.push(action.payload)
    },
    clearAlert: (state, action: PayloadAction<AlertId>) => {
      return state.filter((alert) => alert.id !== action.payload)
    },
  },
})

export const { setAlert, clearAlert } = alertSlice.actions
export default alertSlice.reducer
