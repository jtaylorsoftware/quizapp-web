import { ValidationError } from './error'

/**
 * Encapsulates the status and data of a fetch response.
 */
export type ApiResult<T> = Success<T> | Failure

/**
 * Models the response for a successful fetch request.
 */
export class Success<T> {
  constructor(public data: T, public status: number) {}
}

/**
 * Models the response for a failing fetch request.
 */
export class Failure {
  constructor(public status: number, public errors: ValidationError[]) {}
}

/**
 * Checks if the `ApiResponse` represents `Success`.
 */
export function isSuccess<T>(response: ApiResult<T>): response is Success<T> {
  return response.status >= 200 && response.status < 300
}

/**
 * Checks if the fetch `Response` was successful or not, and returns the appropriate
 * `ApiResponse` type.
 */
export async function parseResponse<T>(
  response: Response
): Promise<ApiResult<T>> {
  try {
    if (!response.ok) {
      return new Failure(response.status, await parseErrors(response))
    } else {
      return new Success(await parseBody(response), response.status)
    }
  } catch (error) {
    return new Failure(500, [])
  }
}

/**
 * Checks if the fetch `Response` was successful or not. This function
 * ignores the presence or absence of a response body.
 */
export async function checkResponse(
  response: Response
): Promise<ApiResult<void>> {
  try {
    if (!response.ok) {
      return new Failure(response.status, await parseErrors(response))
    } else {
      return new Success(undefined, response.status)
    }
  } catch (error) {
    return new Failure(500, [])
  }
}

async function parseBody<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('Content-Type')
  if (contentType && contentType.startsWith('application/json')) {
    // Assume that the server is sending what it has promised to send,
    // hard to generically check every possibility
    return response.json() as Promise<T>
  } else {
    throw new Error(`Unexpected response Content-Type: ${contentType}`)
  }
}

async function parseErrors(response: Response): Promise<ValidationError[]> {
  let errors: ValidationError[] = []
  const contentType = response.headers.get('Content-Type')
  if (contentType && contentType.startsWith('application/json')) {
    const body: { errors: unknown | undefined } | string | undefined =
      await response.json()
    if (typeof body === 'object') {
      if (body.errors != null && body.errors instanceof Array) {
        for (const err of body.errors) {
          if (typeof err === 'object') {
            // Assume it's going to resemble a ValidationError
            errors.push(err)
          } else if (typeof err === 'string') {
            // Assume anything string-like is just a message-only error
            errors.push({ message: err })
          }
        }
      }
    } else if (typeof body === 'string') {
      errors.push({ message: body })
    }
  }
  return errors
}
