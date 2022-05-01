import API from 'api'
import { ResultListType, QuizListType, User } from 'api/models'
import { useState } from 'react'
import { useMountedEffect } from 'hooks'
import { Failure, isSuccess } from 'api/result'

type LoadingData<T> = {
  loading: boolean
  data?: T
  error?: Failure | null
}

type DashboardData = {
  quizzes: LoadingData<QuizListType<'listing'>>
  results: LoadingData<ResultListType<'listing'>>
}

export const useDashboard = (user: User | null | undefined): DashboardData => {
  const [data, setData] = useState<DashboardData>({
    quizzes: {
      loading: true,
    },
    results: {
      loading: true,
    },
  })

  const userQuizList = user?.quizzes
  const userResultList = user?.results

  useMountedEffect(
    (status) => {
      API.User.getQuizzes('listing').then((result) => {
        if (status.mounted) {
          if (isSuccess(result)) {
            setData((prev) => {
              return {
                results: prev.results,
                quizzes: {
                  loading: false,
                  data: result.data,
                },
              }
            })
          } else {
            setData((prev) => {
              return {
                results: prev.results,
                quizzes: {
                  loading: false,
                  error: result,
                },
              }
            })
          }
        }
      })
    },
    [userQuizList]
  )

  useMountedEffect(
    (status) => {
      API.User.getResults('listing').then((result) => {
        if (status.mounted) {
          if (isSuccess(result)) {
            setData((prev) => {
              return {
                quizzes: prev.quizzes,
                results: {
                  loading: false,
                  data: result.data,
                },
              }
            })
          } else {
            setData((prev) => {
              return {
                quizzes: prev.quizzes,
                results: {
                  loading: false,
                  error: result,
                },
              }
            })
          }
        }
      })
    },
    [userResultList]
  )

  return data
}
