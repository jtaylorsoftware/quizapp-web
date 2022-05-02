import { QuizFormat, QuizType } from 'api/models'
import API from 'api'
import { useState } from 'react'
import { useMountedEffect } from './useMountedEffect'
import { Failure, isSuccess } from 'api/result'

export const useQuiz = <T extends QuizFormat>(
  id: string,
  format: T
): [QuizType<T> | null, Failure | null, boolean] => {
  const [quiz, setQuiz] = useState<QuizType<T>>()
  const [error, setError] = useState<Failure | null>(null)

  const [loading, setLoading] = useState(true)

  useMountedEffect(
    (status) => {
      API.Quiz.getQuiz(id, format).then((result) => {
        if (status.mounted) {
          if (isSuccess(result)) {
            setQuiz(result.data)
          } else {
            setError(result)
          }
          setLoading(false)
        }
      })
    },
    [id]
  )

  return [quiz as QuizType<T>, error, loading]
}
