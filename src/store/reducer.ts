import { combineReducers } from '@reduxjs/toolkit'

import { default as alerts } from './alerts/slice'
import { default as auth } from './auth/slice'
import { default as user } from './user/slice'

const rootReducer = combineReducers({
  alerts,
  auth,
  user,
})

export default rootReducer
