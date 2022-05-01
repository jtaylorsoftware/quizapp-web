import { ID, IdResult, Quiz, QuizFormat, QuizType } from './models'
import { ApiResult, parseResponse } from './result'
import { config } from './config'

/**
 * Get a single Quiz in either full or listing format.
 */
export const getQuiz = async <T extends QuizFormat>(
  id: string,
  format: T
): Promise<ApiResult<QuizType<T>>> => {
  const response = await fetch(
    `${config.baseUrl}/quizzes/${id}${format === 'full' ? '' : '/form'}`,
    {
      method: 'GET',
      headers: {
        'x-auth-token': localStorage.getItem('token') ?? '',
      },
    }
  )

  return parseResponse(response)
}

/**
 * Uploads a new Quiz, returning the id of the created Quiz.
 */
export const uploadQuiz = async (quiz: Quiz): Promise<ApiResult<IdResult>> => {
  const response = await fetch(`${config.baseUrl}/quizzes/`, {
    method: 'POST',
    headers: {
      'x-auth-token': localStorage.getItem('token') ?? '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quiz),
  })

  return parseResponse<IdResult>(response)
}

/**
 * Uploads edits to a Quiz.
 */
export const editQuiz = async (quiz: Quiz): Promise<ApiResult<void>> => {
  const response = await fetch(`${config.baseUrl}/quizzes/${quiz._id!}/edit`, {
    method: 'PUT',
    headers: {
      'x-auth-token': localStorage.getItem('token') ?? '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quiz),
  })

  return parseResponse(response)
}

/**
 * Deletes a quiz that the current user owns.
 */
export const deleteQuiz = async (id: ID): Promise<ApiResult<void>> => {
  const response = await fetch(`${config.baseUrl}/quizzes/${id}`, {
    method: 'DELETE',
    headers: {
      'x-auth-token': localStorage.getItem('token') ?? '',
    },
  })

  return parseResponse(response)
}
