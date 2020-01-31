import { Alerts } from '../actions/types'

export const alerts = (state = [], action) => {
  switch (action.type) {
    case Alerts.SET_ALERT:
      return [...state, action.data]
    case Alerts.CLEAR_ALERT:
      return state.filter(alert => alert.id !== action.data)
    default:
      return state
  }
}
