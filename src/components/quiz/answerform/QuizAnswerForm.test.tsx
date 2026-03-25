import React from 'react'
import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom'
import { render, screen, waitFor } from 'util/test-utils'

import moment from 'moment'

jest.mock('hooks/useQuiz')
import { useQuiz } from 'hooks/useQuiz'

jest.mock('hooks/useResult')
import { useSingleResult } from 'hooks/useResult'

jest.mock('api')
import API from 'api'

import { user, quiz, result } from 'mocks/state'

import QuizAnswerForm from './QuizAnswerForm'
import { Failure, Success } from 'api/result'

describe('QuizAnswerForm', () => {
  const mockUseQuiz = jest.mocked(useQuiz)
  const mockUseSingleResult = jest.mocked(useSingleResult)
  const mockQuiz = quiz
  const mockResult = result
  const mockError404 = { status: 404, errors: [] }
  const mockError400 = { status: 400, errors: [] }
  const mockError403 = { status: 403, errors: [] }

  const initialLocation = '/quizzes/1234-5678'
  const renderForm = () => render(<QuizAnswerForm />, { user }, initialLocation)

  beforeEach(() => {
    mockUseQuiz.mockReset()
    mockUseSingleResult.mockReset()
  })

  it('renders without crashing', () => {
    mockUseQuiz.mockReturnValueOnce([mockQuiz, null, false])
    mockUseSingleResult.mockReturnValueOnce([null, null, false])
    renderForm()
  })

  it('renders a spinner if the quiz is loading', () => {
    mockUseQuiz.mockReturnValueOnce([null, null, true])
    mockUseSingleResult.mockReturnValueOnce([null, mockError404, false])
    renderForm()
    expect(screen.queryByRole('status')).not.toBeNull()
  })

  it('renders a spinner if the result is loading', () => {
    mockUseQuiz.mockReturnValueOnce([mockQuiz, null, false])
    mockUseSingleResult.mockReturnValueOnce([null, null, true])
    renderForm()
    expect(screen.queryByRole('status')).not.toBeNull()
  })

  it('displays the title and creator of the quiz', () => {
    mockUseQuiz.mockReturnValueOnce([mockQuiz, null, false])
    mockUseSingleResult.mockReturnValueOnce([null, null, false])
    renderForm()
    expect(screen.getByText(RegExp(`${mockQuiz.user}`))).not.toBeNull()
    expect(screen.queryByText(mockQuiz.title)).not.toBeNull()
  })

  it('renders QuizExpiredError if error indicates expired quiz', () => {
    mockUseQuiz.mockReturnValueOnce([
      null,
      new Failure(403, [{ field: 'expiration', message: 'expired' }]),
      false,
    ])
    mockUseSingleResult.mockReturnValueOnce([null, null, false])
    renderForm()
    expect(screen.queryByText(/quiz has expired/i)).not.toBeNull()
  })

  it('renders a generic error page if quiz error is not 403 or 400', () => {
    mockUseQuiz.mockReturnValueOnce([null, mockError404, false])
    mockUseSingleResult.mockReturnValueOnce([null, null, false])
    renderForm()
    expect(screen.getByText(/404/)).not.toBeNull()
  })

  it('renders QuizExpiredError if quiz is expired (but quiz has no error)', () => {
    const expiration = moment().subtract(1, 'd').toISOString()
    mockUseQuiz.mockReturnValueOnce([{ ...mockQuiz, expiration }, null, false])
    mockUseSingleResult.mockReturnValueOnce([null, null, false])
    renderForm()
    expect(screen.queryByText(/quiz has expired/i)).not.toBeNull()
  })

  it('renders QuizTakenError if user has taken quiz', () => {
    mockUseQuiz.mockReturnValueOnce([mockQuiz, null, false])
    mockUseSingleResult.mockReturnValueOnce([mockResult, null, false])
    renderForm()
    expect(screen.queryByText(/already taken this quiz/i)).not.toBeNull()
  })

  it('redirects to /dashboard if cancel is clicked', async () => {
    mockUseQuiz.mockReturnValue([mockQuiz, null, false])
    mockUseSingleResult.mockReturnValue([null, null, false])
    renderForm()
    const user = userEvent.setup()
    const cancelBtn = screen.getByText('Cancel')
    await user.click(cancelBtn)
    expect(screen.getByTestId('router-location').textContent).toContain(
      '/dashboard'
    )
  })

  it('calls Api.results.post when clicking submit', async () => {
    mockUseQuiz.mockReturnValue([mockQuiz, null, false])
    mockUseSingleResult.mockReturnValue([null, null, false])
    renderForm()
    const user = userEvent.setup()
    const mockResultsPost = jest
      .mocked(API.Results.uploadResponses)
      .mockResolvedValue(new Success({ id: '12345' }, 204))
    const submitBtn = screen.getByText('Submit')

    await user.click(submitBtn)

    await waitFor(() => {
      expect(mockResultsPost).toHaveBeenCalled()
      expect(screen.getByTestId('router-location').textContent).toContain(
        '/dashboard'
      )
    })
  })

  it('renders the QuestionList', () => {
    mockUseQuiz.mockReturnValueOnce([mockQuiz, null, false])
    mockUseSingleResult.mockReturnValueOnce([null, null, false])
    renderForm()
    expect(screen.queryByTestId('questionlist')).not.toBeNull()
  })
})
