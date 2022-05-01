import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import moment from 'moment'

import API from 'api'
import { useBeforeUnload } from 'hooks'
import { createAlert } from 'store/alerts/thunks'
import { loadUser } from 'store/user/thunks'
import { connect, ConnectedProps } from 'react-redux'

import { Quiz } from 'api/models'
import { Failure, isSuccess } from 'api/result'

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
const QuizCreator = ({ createAlert, loadUser }: Props) => {
  const navigate = useNavigate()

  const defaultQuiz = {
    title: '',
    isPublic: true,
    allowedUsers: [],
    date: moment().toISOString(),
    expiration: moment().add(1, 'd').toISOString(),
    questions: [],
  }
  const [submitError, setSubmitError] = useState<Failure | null>()

  useBeforeUnload((e) => {
    e.returnValue =
      'Are you sure you want to reload? Changes will not be saved.'
  })

  const goToDashboard = () => {
    navigate('/dashboard')
  }

  const submitQuiz = (quiz: Quiz) => {
    API.Quiz.uploadQuiz(quiz).then((result) => {
      if (!isSuccess(result)) {
        setSubmitError(result)
        createAlert({
          msg: 'Failed to create quiz - are there invalid fields?',
          type: 'danger',
        })
      } else {
        createAlert({
          msg: 'Quiz created successfully',
          type: 'success',
        })
        loadUser().then(() => goToDashboard())
      }
    })
  }

  const validate = submitError?.status === 400

  return (
    <QuizEditorForm
      defaultValue={defaultQuiz}
      cancelSubmit={goToDashboard}
      onSubmit={submitQuiz}
      validate={validate}
      editing={false}
    />
  )
}
export default connector(QuizCreator)
