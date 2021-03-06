import React, { useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import ErrorPage from 'components/errors/ErrorPage'
import Spinner from 'components/common/Spinner'

import API from 'api'
import { Failure, isSuccess } from 'api/result'

import { useQuiz, useBeforeUnload } from 'hooks'
import { createAlert } from 'store/alerts/thunks'
import { loadUser } from 'store/user/thunks'

import { connect, ConnectedProps } from 'react-redux'

import { Quiz } from 'api/models'
import QuizEditorForm from './QuizEditorForm'

const mapDispatch = {
  createAlert,
  loadUser,
}

const connector = connect(undefined, mapDispatch)

type Props = ConnectedProps<typeof connector>

/**
 * Displays forms for editing a quiz and directly handles submission of the quiz.
 */
const QuizEditor = ({ createAlert, loadUser }: Props) => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [userQuiz, quizError, loading] = useQuiz(id ?? '', 'full')
  const [submitError, setSubmitError] = useState<Failure | null>()

  useBeforeUnload((e) => {
    e.returnValue =
      'Are you sure you want to reload? Changes will not be saved.'
  })

  const goToDashboard = () => {
    navigate('/dashboard')
  }

  const submitQuiz = (quiz: Quiz) => {
    API.Quiz.editQuiz(quiz).then((result) => {
      if (!isSuccess(result)) {
        setSubmitError(result)
        createAlert({
          msg: 'Failed to create quiz - are there invalid fields?',
          type: 'danger',
        })
      } else {
        createAlert({
          msg: 'Quiz edited successfully',
          type: 'success',
        })
        loadUser().then(() => goToDashboard())
      }
    })
  }

  const validate = submitError?.status === 400
  if (loading) {
    return <Spinner />
  } else if (quizError) {
    return <ErrorPage status={quizError.status} />
  }

  return (
    <QuizEditorForm
      defaultValue={userQuiz!}
      cancelSubmit={goToDashboard}
      onSubmit={submitQuiz}
      validate={validate}
      editing={true}
    />
  )
}
export default connector(QuizEditor)
