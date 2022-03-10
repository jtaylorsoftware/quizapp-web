import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from 'util/test-utils'
import { createMemoryHistory } from 'history'

import { user, auth } from 'mocks/state'

jest.mock('components/quiz/answerform/QuizAnswerForm', () => jest.fn())
import QuizAnswerForm from 'components/quiz/answerform/QuizAnswerForm'

jest.mock('components/quiz/result/QuizResultList', () => jest.fn())
import QuizResultList from 'components/quiz/result/QuizResultList'

import QuizRoute from './QuizRoute'

import { UserState } from 'store/user/types'
import { AuthState } from 'store/auth/types'
import clone from 'clone'
import { Route, Routes } from 'react-router-dom'

describe('QuizRoute', () => {
  let mockUser: UserState
  let mockAuth: AuthState

  const MockQuizAnswerForm = jest.mocked(QuizAnswerForm).mockReturnValue(
    <div>QuizAnswerForm</div>,
  )
  const MockQuizResultList = jest.mocked(QuizResultList).mockReturnValue(
    <div>QuizResultList</div>,
  )

  beforeEach(() => {
    MockQuizAnswerForm.mockClear()
    MockQuizResultList.mockClear()
    mockUser = clone(user)
    mockAuth = clone(auth)
  })

  it('renders a QuizResultList if the current user owns the quiz', () => {
    const mockStore = {
      user,
      auth: {
        ...auth,
        isAuthenticated: true,
      },
    }
    const quizId = mockStore.user.user!.quizzes[0]
    const history = createMemoryHistory()
    history.push(`/quizzes/${quizId}`)
    render(
      <Routes><Route path='/quizzes/:id' element={<QuizRoute />} /></Routes>,
      mockStore,
      history,
      `/quizzes/${quizId}`,
    )
    expect(screen.queryByText('QuizResultList')).not.toBeNull()
  })

  it('renders a QuizAnswerForm when the current user does not own the quiz', () => {
    const mockStore = {
      user,
      auth: {
        ...auth,
        isAuthenticated: true,
      },
    }
    const quizId = mockStore.user.user!.quizzes[0]
    mockStore.user.user!.quizzes = []

    const history = createMemoryHistory()

    render(
      <Routes><Route path='/quizzes/:id' element={<QuizRoute />} /></Routes>,
      mockStore,
      history,
      `/quizzes/${quizId}`,
    )
    history.push(`/quizzes/${quizId}`)
    expect(screen.queryByText('QuizAnswerForm')).not.toBeNull()
  })
})
