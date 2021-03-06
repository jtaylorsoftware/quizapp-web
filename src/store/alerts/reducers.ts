import { AlertState, AlertActionTypes, SET_ALERT, CLEAR_ALERT } from './types'

const initialState: AlertState = []

export function alertReducer(
  state = initialState,
  action: AlertActionTypes
): AlertState {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload]
    case CLEAR_ALERT:
      return state.filter((alert) => alert.id !== action.id)
    default:
      return state
  }
}
