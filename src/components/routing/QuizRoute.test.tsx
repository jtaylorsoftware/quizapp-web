import React from 'react'

import { render, screen } from 'util/test-utils'

import { user, auth } from 'mocks/state'

import QuizRoute from './QuizRoute'

import { UserState } from 'store/user/types'
import { AuthState } from 'store/auth/types'
import clone from 'clone'
import { Route, Routes } from 'react-router-dom'

vi.mock('components/quiz/answerform/QuizAnswerForm', () => {
  return {
    default: () => <div>QuizAnswerForm</div>,
  }
})
vi.mock('components/quiz/result/QuizResultList', () => {
  return {
    default: () => <div>QuizResultList</div>,
  }
})

describe('QuizRoute', () => {
  let mockUser: UserState
  let mockAuth: AuthState

  beforeEach(() => {
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
    render(
      <Routes>
        <Route path='/quizzes/:id' element={<QuizRoute />} />
      </Routes>,
      mockStore,
      `/quizzes/${quizId}`
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

    render(
      <Routes>
        <Route path='/quizzes/:id' element={<QuizRoute />} />
      </Routes>,
      mockStore,
      `/quizzes/${quizId}`
    )
    expect(screen.queryByText('QuizAnswerForm')).not.toBeNull()
  })
})
