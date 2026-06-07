import React from 'react'
import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from 'util/test-utils'

import moment from 'moment'
import clone from 'clone'

import { useQuiz } from 'hooks/useQuiz'

import { createAlert } from 'store/alerts/thunks'

import { loadUser } from 'store/user/thunks'

import { Quiz } from 'api/models'

import QuizEditor from './QuizEditor'

const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)
vi.mock('hooks/useQuiz')
vi.mock('store/alerts/thunks')
vi.mock('store/user/thunks')

const quiz: Quiz = {
  _id: 'quizid',
  title: '',
  date: moment().toISOString(),
  isPublic: true,
  allowedUsers: [],
  expiration: moment().add(1, 'd').toISOString(),
  publishResults: true,
  showCorrectAnswers: true,
  questions: [],
}

describe('QuizEditor', () => {
  let mockQuiz: Quiz
  const mockUseQuiz = vi.mocked(useQuiz).mockReturnValue([null, null, false])
  const mockCreateAlert = vi
    .mocked(createAlert)
    .mockReturnValue(async () => {})
  const mockLoadUser = vi
    .mocked(loadUser)
    .mockReturnValue(async (dispatch) => {})

  beforeEach(() => {
    mockUseQuiz.mockClear()
    mockCreateAlert.mockClear()
    mockQuiz = clone(quiz)
    mockFetch.mockClear()
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
    const user = userEvent.setup()
    mockFetch.mockResolvedValueOnce(
      new Response(JSON.stringify({}), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }))

    const submitBtn = screen.getByText('Confirm Edits')
    await user.click(submitBtn)

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
    const user = userEvent.setup()
    mockFetch.mockResolvedValueOnce(
      new Response(JSON.stringify({ errors: [] }), {
        status: 400,
      })
    )

    const submitBtn = screen.getByText('Confirm Edits')
    await user.click(submitBtn)

    await waitFor(() => {
      expect(
        screen.queryByText(/please enter at least one character/i)
      ).not.toBeNull()
    })
  })
})
