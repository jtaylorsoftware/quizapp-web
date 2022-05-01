import API from 'api'
import { ID } from 'api/models'
import { Failure, isSuccess } from 'api/result'
import { createAlert } from '../alerts/thunks'
import { clearAuth } from '../auth/thunks'
import { Thunk } from '../store'
import {
  changeUserEmail as changeEmailAction,
  changeUserPassword as changePasswordAction,
  deleteQuiz as deleteQuizAction,
  deleteQuizError,
  deleteUser as deleteUserAction,
  deleteUserError,
  loadUser as loadUserAction,
  loadUserError,
  logoutUser,
} from './actions'

/**
 * Loads data for the User represented by the current JWT.
 * Dispatches an action of type LOAD_USER on success and
 * LOAD_USER_ERROR otherwise.
 */
export function loadUser(): Thunk<Promise<void>> {
  return async (dispatch) => {
    try {
      const result = await API.User.getProfile()
      if (isSuccess(result)) {
        dispatch(loadUserAction(result.data))
      } else {
        dispatch(loadUserError(result))
        dispatch(
          createAlert({
            msg: "We couldn't load your account right now.",
            type: 'danger',
          })
        )
      }
    } catch (error) {
      console.error(error)
    }
  }
}
/**
 * Changes a User's email. Dispatches an action with type CHANGE_USER_INFO
 * on success and CHANGE_USER_INFO_ERROR otherwise.
 * @param email New email to replace current
 */
export function changeUserEmail(email: string): Thunk<Promise<Failure | null>> {
  return async (dispatch) => {
    try {
      const result = await API.User.changeEmail(email)
      if (isSuccess(result)) {
        dispatch(changeEmailAction(email))
        dispatch(
          createAlert({
            msg: 'Your email was changed successfully',
            type: 'success',
          })
        )
        dispatch(loadUser())
        return null
      } else {
        return result
      }
    } catch (error) {
      console.error(error)
      return new Failure(500, [])
    }
  }
}
/**
 * Changes a User's login password. Dispatches an action with type CHANGE_USER_INFO
 * on success and CHANGE_USER_INFO_ERROR otherwise.
 * @param password New password to replace current
 */
export function changeUserPassword(
  password: string
): Thunk<Promise<Failure | null>> {
  return async (dispatch) => {
    try {
      const result = await API.User.changePassword(password)
      if (isSuccess(result)) {
        dispatch(changePasswordAction())

        dispatch(
          createAlert({
            msg: 'Your pssword was changed successfully',
            type: 'success',
          })
        )
        return null
      } else {
        return result
      }
    } catch (error) {
      console.error(error)
      return new Failure(500, [])
    }
  }
}
/**
 * Deletes the user's account (irreversable) and clears auth.
 */
export function deleteUser(): Thunk<Promise<void>> {
  return async (dispatch) => {
    try {
      const result = await API.User.deleteUser()
      if (isSuccess(result)) {
        dispatch(deleteUserAction())
        dispatch(clearAuth())
      } else {
        dispatch(deleteUserError(result))
      }
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * Logs out the current user.
 */
export function logout(): Thunk {
  return (dispatch) => {
    dispatch(logoutUser())
    dispatch(clearAuth())
  }
}

/**
 * Deletes the current user's quiz by its id.
 */
export function deleteQuiz(quizId: ID): Thunk<Promise<void>> {
  return async (dispatch) => {
    try {
      const result = await API.Quiz.deleteQuiz(quizId)
      if (isSuccess(result)) {
        dispatch(deleteQuizAction(quizId))
      } else {
        dispatch(deleteQuizError(result))
      }
    } catch (error) {
      console.error(error)
    }
  }
}
