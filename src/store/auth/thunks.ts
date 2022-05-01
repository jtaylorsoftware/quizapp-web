import API from 'api'
import { UserLogin, UserRegistration } from 'api/models'
import { Failure, isSuccess } from 'api/result'
import { createAlert } from '../alerts/thunks'
import { Thunk } from '../store'
import { loadUser } from '../user/thunks'
import { clearAuthUser, setAuthUser } from './actions'

/**
 * Registers a new User with the server.
 *
 * @param userRegistration Registration info for a new user
 */
export function register({
  username,
  email,
  password,
}: UserRegistration): Thunk<Promise<Failure | null>> {
  return async (dispatch) => {
    try {
      const result = await API.User.register({ username, email, password })
      if (isSuccess(result)) {
        dispatch(setAuthUser(result.data.token))
        dispatch(loadUser())
        dispatch(
          createAlert({
            msg: 'Welcome to QuizNow!',
            type: 'success',
          })
        )
        return null
      } else {
        dispatch(clearAuthUser())
        return result
      }
    } catch (error) {
      console.error(error)
      return new Failure(500, [])
    }
  }
}

/**
 * Logs a User in, fetching their JWT.
 *
 * Dispatches an action of type LOGIN_USER on success and LOGIN_ERROR otherwise.
 *
 * @param userLogin Login info for an existing user
 */
export function login({
  username,
  password,
}: UserLogin): Thunk<Promise<Failure | null>> {
  return async (dispatch) => {
    try {
      const result = await API.User.login({ username, password })
      if (isSuccess(result)) {
        dispatch(setAuthUser(result.data.token))
        dispatch(loadUser())
        dispatch(
          createAlert({
            msg: 'Welcome back!',
            type: 'success',
          })
        )
        return null
      } else {
        dispatch(clearAuthUser())
        return result
      }
    } catch (error) {
      console.error(error)
      return new Failure(500, [])
    }
  }
}
/**
 * Clears the auth data (token, isAuthenticated)
 */
export const clearAuth = (): Thunk => (dispatch) => dispatch(clearAuthUser())
