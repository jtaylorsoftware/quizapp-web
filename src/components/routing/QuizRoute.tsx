import React from 'react'
import {
  useParams,
} from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'

import QuizAnswerForm from 'components/quiz/answerform/QuizAnswerForm'
import QuizResultList from 'components/quiz/result/QuizResultList'

import { RootState } from 'store/store'

const mapState = (state: RootState) => ({
  user: state.user.user,
})

const connector = connect(mapState)

type Props = ConnectedProps<typeof connector>

/**
 * Handles redirection to a Quiz answer form or the results page depending
 * on whether the user created the quiz (user.quizzes contains the quiz) or not.
 */
const QuizRoute = ({ user }: Props) => {
  const { id: quizId } = useParams<{ id: string }>()
  if (user && user.quizzes.some(id => id === quizId)) {
    return <QuizResultList />
  } else {
    return <QuizAnswerForm />
  }
}

export default connector(QuizRoute)
