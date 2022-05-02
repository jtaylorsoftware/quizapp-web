import { ApiResult, checkResponse, parseResponse } from './result'
import {
  JWT,
  QuizListType,
  ResultFormat,
  ResultListType,
  UserLogin,
} from './models'
import { config } from './config'
import { User, UserRegistration } from './models'

/**
 * Loads the current user's profile data.
 */
export const getProfile = async (): Promise<ApiResult<User>> => {
  const response = await fetch(`${config.baseUrl}/users/me/`, {
    method: 'GET',
    headers: {
      'x-auth-token': localStorage.getItem('token') ?? '',
    },
  })

  return parseResponse<User>(response)
}

/**
 * Changes the current user's email.
 */
export const changeEmail = async (email: string): Promise<ApiResult<void>> => {
  const response = await fetch(`${config.baseUrl}/users/me/email/`, {
    method: 'PUT',
    headers: {
      'x-auth-token': localStorage.getItem('token') ?? '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })

  return checkResponse(response)
}

/**
 * Changes the current user's password.
 */
export const changePassword = async (
  password: string
): Promise<ApiResult<void>> => {
  const response = await fetch(`${config.baseUrl}/users/me/password/`, {
    method: 'PUT',
    headers: {
      'x-auth-token': localStorage.getItem('token') ?? '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  })

  return checkResponse(response)
}

/**
 * Gets all of the current user's quizzes in the given format, either `'listing'` or `'full'`.
 */
export const getQuizzes = async <T extends ResultFormat>(
  format: T
): Promise<ApiResult<QuizListType<T>>> => {
  const response = await fetch(
    `${config.baseUrl}/users/me/quizzes?format=${format}`,
    {
      method: 'GET',
      headers: {
        'x-auth-token': localStorage.getItem('token') ?? '',
      },
    }
  )

  return parseResponse<QuizListType<T>>(response)
}

/**
 * Gets all of the current user's quiz results in the given format, either `'listing'` or `'full'`.
 */
export const getResults = async <T extends ResultFormat>(
  format: T
): Promise<ApiResult<ResultListType<T>>> => {
  const response = await fetch(
    `${config.baseUrl}/users/me/results?format=${format}`,
    {
      method: 'GET',
      headers: {
        'x-auth-token': localStorage.getItem('token') ?? '',
      },
    }
  )

  return parseResponse<ResultListType<T>>(response)
}

/**
 * Deletes the current user's account irreversibly.
 */
export const deleteUser = async (): Promise<ApiResult<void>> => {
  const response = await fetch(`${config.baseUrl}/users/me/`, {
    method: 'DELETE',
    headers: {
      'x-auth-token': localStorage.getItem('token') ?? '',
    },
  })

  return checkResponse(response)
}

/**
 * Registers a new user.
 */
export const register = async ({
  username,
  email,
  password,
}: UserRegistration): Promise<ApiResult<JWT>> => {
  const response = await fetch(`${config.baseUrl}/users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  })

  return parseResponse<JWT>(response)
}

/**
 * Logs in a user.
 */
export const login = async ({
  username,
  password,
}: UserLogin): Promise<ApiResult<JWT>> => {
  const response = await fetch(`${config.baseUrl}/users/auth/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })

  return parseResponse<JWT>(response)
}
