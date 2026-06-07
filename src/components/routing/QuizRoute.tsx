import React from 'react'
import { useParams } from 'react-router-dom'

import QuizAnswerForm from 'components/quiz/answerform/QuizAnswerForm'
import QuizResultList from 'components/quiz/result/QuizResultList'
import { useAppSelector } from 'hooks'

/**
 * Handles redirection to a Quiz answer form or the results page depending
 * on whether the user created the quiz (user.quizzes contains the quiz) or not.
 */
const QuizRoute = () => {
  const user = useAppSelector((state) => state.user.user)
  const { id: quizId } = useParams<{ id: string }>()
  if (user && user.quizzes.some((id) => id === quizId)) {
    return <QuizResultList />
  } else {
    return <QuizAnswerForm />
  }
}

export default QuizRoute
