import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import moment from 'moment'

import API from 'api'
import { useAppDispatch, useBeforeUnload } from 'hooks'
import { createAlert } from 'store/alerts/thunks'
import { loadUser } from 'store/user/thunks'

import { Quiz } from 'api/models'
import { Failure, isSuccess } from 'api/result'

import QuizEditorForm from './QuizEditorForm'

/**
 * Displays forms for editing a quiz and directly handles submission of the quiz.
 */
const QuizCreator = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const defaultQuiz = {
    title: '',
    isPublic: true,
    allowedUsers: [],
    date: moment().toISOString(),
    expiration: moment().add(1, 'd').toISOString(),
    publishResults: true,
    showCorrectAnswers: true,
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
        dispatch(createAlert({
          msg: 'Failed to create quiz - are there invalid fields?',
          type: 'danger',
        }))
      } else {
        dispatch(createAlert({
          msg: 'Quiz created successfully',
          type: 'success',
        }))
        dispatch(loadUser()).then(() => goToDashboard())
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
export default QuizCreator
