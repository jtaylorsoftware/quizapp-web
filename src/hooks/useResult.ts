import { ResultFormat, SingleResultType, ResultListType } from 'api/models'
import API from 'api'
import { Failure, isSuccess } from 'api/result'

import { useState } from 'react'
import { useMountedEffect } from './useMountedEffect'

export const useResultList = <T extends ResultFormat>(
  quizId: string,
  format: T
): [ResultListType<T> | null, Failure | null, boolean] => {
  const [results, setResults] = useState<ResultListType<T> | null>(null)
  const [error, setError] = useState<Failure | null>(null)

  const [loading, setLoading] = useState(true)

  useMountedEffect(
    (status) => {
      API.Results.getAllResults(quizId, format).then((result) => {
        if (status.mounted) {
          if (isSuccess(result)) {
            setResults(result.data.results)
          } else {
            setError(result)
          }
          setLoading(false)
        }
      })
    },
    [quizId]
  )

  return [results, error, loading]
}

export const useSingleResult = <T extends ResultFormat>(
  quizId: string,
  userId: string,
  format: T
): [SingleResultType<T> | null, Failure | null, boolean] => {
  const [result, setResult] = useState<SingleResultType<T> | null>(null)
  const [error, setError] = useState<Failure | null>(null)

  const [loading, setLoading] = useState(true)

  useMountedEffect(
    (status) => {
      API.Results.getOneResult(quizId, userId, format).then((result) => {
        if (status.mounted) {
          if (isSuccess(result)) {
            setResult(result.data)
          } else {
            setError(result)
          }
          setLoading(false)
        }
      })
    },
    [quizId, userId]
  )

  return [result, error, loading]
}
