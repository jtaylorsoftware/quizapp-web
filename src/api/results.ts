import { ApiResult, parseResponse } from './result'
import {
  ResultFormat,
  SingleResultType,
  ResultListType,
  FormResponse,
  IdResult,
} from './models'
import { config } from './config'

/**
 * Gets all results for a quiz in the given format, either listing or full.
 */
export const getAllResults = async <T extends ResultFormat>(
  quizId: string,
  format: T
): Promise<ApiResult<ResultListType<T>>> => {
  const response = await fetch(
    `${config.baseUrl}/results?quiz=${quizId}&format=${format}`,
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
 * Gets a single result that was submitted by the user for the given quiz.
 */
export const getOneResult = async <T extends ResultFormat>(
  quizId: string,
  userId: string,
  format: T
): Promise<ApiResult<SingleResultType<T>>> => {
  const response = await fetch(
    `${config.baseUrl}/results?quiz=${quizId}&user=${userId}&format=${format}`,
    {
      method: 'GET',
      headers: {
        'x-auth-token': localStorage.getItem('token') ?? '',
      },
    }
  )

  return parseResponse<SingleResultType<T>>(response)
}

/**
 * Uploads responses to a quiz, returning the id of the successfully uploaded
 * response.
 */
export const uploadResponses = async (
  quizId: string,
  answers: FormResponse[]
): Promise<ApiResult<IdResult>> => {
  const response = await fetch(`${config.baseUrl}/results?quiz=${quizId}`, {
    method: 'POST',
    headers: {
      'x-auth-token': localStorage.getItem('token') ?? '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ answers }),
  })

  return parseResponse<IdResult>(response)
}
