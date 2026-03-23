import fetchMock, { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

import React from 'react'

import '@testing-library/jest-dom'
import { act, fireEvent, render, screen, waitFor } from 'util/test-utils'

import moment from 'moment'
import clone from 'clone'

jest.mock('hooks/useQuiz')
import { useQuiz } from 'hooks/useQuiz'

jest.mock('store/alerts/thunks')
import { createAlert } from 'store/alerts/thunks'

jest.mock('store/user/thunks')
import { loadUser } from 'store/user/thunks'

import { Quiz } from 'api/models'

import QuizEditor from './QuizEditor'

const quiz: Quiz = {
  _id: 'quizid',
  title: '',
  date: moment().toISOString(),
  isPublic: true,
  allowedUsers: [],
  expiration: moment().add(1, 'd').toISOString(),
  questions: [],
}

describe('QuizEditor', () => {
  let mockQuiz: Quiz
  const mockUseQuiz = jest.mocked(useQuiz).mockReturnValue([null, null, false])
  const mockCreateAlert = jest
    .mocked(createAlert)
    .mockReturnValue(async () => {})
  const mockLoadUser = jest
    .mocked(loadUser)
    .mockReturnValue(async (dispatch) => {})

  beforeEach(() => {
    mockUseQuiz.mockClear()
    mockCreateAlert.mockClear()
    mockQuiz = clone(quiz)
    fetchMock.mockClear()
  })

  it('renders without crashing', () => {
    mockUseQuiz.mockReturnValueOnce([mockQuiz, null, false])
    render(<QuizEditor />)
  })

  it('renders a Spinner if quiz is loading', () => {
    mockUseQuiz.mockReturnValueOnce([null, null, true])
    render(<QuizEditor />)
    expect(screen.queryByRole('status')).not.toBeNull()
  })

  it('redirects to /dashboard and creates an alert after successful submit', async () => {
    mockUseQuiz.mockReturnValueOnce([mockQuiz, null, false])

    render(<QuizEditor />, { alerts: [] })
    fetchMock.mockResponseOnce(JSON.stringify({}), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const submitBtn = screen.getByText('Confirm Edits')
    act(() => {
      fireEvent.click(submitBtn)
    })

    await waitFor(() => {
      expect(screen.getByTestId('router-location').textContent).toContain(
        '/dashboard'
      )
      expect(mockCreateAlert).toHaveBeenCalled()
    })
  })

  it('shows validation errors if the submission failed', async () => {
    mockUseQuiz.mockReturnValueOnce([mockQuiz, null, false])

    render(<QuizEditor />)
    fetchMock.mockResponseOnce(JSON.stringify({ errors: [] }), {
      status: 400,
    })

    const submitBtn = screen.getByText('Confirm Edits')
    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(
        screen.queryByText(/please enter at least one character/i)
      ).not.toBeNull()
    })
  })
})
