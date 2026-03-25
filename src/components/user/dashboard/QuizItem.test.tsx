import React from 'react'
import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom'
import { render, screen, within } from 'util/test-utils'
import clone from 'clone'

jest.mock('store/user/thunks')
import { deleteQuiz } from 'store/user/thunks'

import { QuizListing } from 'api/models'

import { quizzes } from 'mocks/state'
import QuizItem from './QuizItem'
import moment from 'moment'
import { calculateTimeDifference, createTimestamp } from 'util/date'

describe('QuizItem', () => {
  const deleteQuizMock = jest
    .mocked(deleteQuiz)
    .mockReturnValue(async (dispatch) => {})
  let mockState: QuizListing[]

  beforeEach(() => {
    deleteQuizMock.mockClear()
    mockState = clone(quizzes)
  })

  it('renders without crashing', () => {
    render(<QuizItem quiz={mockState[0]} />)
  })

  it('renders the quiz title, questionCount, and resultsCount', () => {
    const quiz = mockState[0]
    render(<QuizItem quiz={quiz} />)
    expect(screen.queryByText(quiz.title)).not.toBeNull()
    expect(screen.queryByText(`${quiz.questionCount} Question`)).not.toBeNull()
    expect(screen.queryByText(`${quiz.resultsCount} Response`)).not.toBeNull()
  })

  it('renders the quiz link', () => {
    const quiz = mockState[0]
    render(<QuizItem quiz={quiz} />)
    expect(screen.getByText(`/quizzes/${quiz._id}`)).not.toBeNull()
  })

  it('renders the quiz created date timestamp', () => {
    const quiz = mockState[0]
    render(<QuizItem quiz={quiz} />)
    expect(screen.queryByText(/created today/i)).not.toBeNull()
  })

  it('renders the timestamp correctly for old quizzes', () => {
    const quiz = mockState[0]
    quiz.date = moment().subtract(2, 'y').toISOString()
    render(<QuizItem quiz={quiz} />)
    const timestamp = createTimestamp(
      calculateTimeDifference(moment(), moment(quiz.date))
    )
    expect(screen.queryByText(`Created ${timestamp}`)).not.toBeNull()
  })

  it('renders the expiration text for an expired quiz', () => {
    const quiz = mockState[0]
    quiz.expiration = moment().subtract(2, 'y').toISOString()
    render(<QuizItem quiz={quiz} />)
    expect(screen.queryByText(/expired/i)).not.toBeNull()
  })

  it('redirects to the quiz editor when the edit button is clicked', async () => {
    render(<QuizItem quiz={mockState[0]} />)
    const user = userEvent.setup()

    const editBtn = screen.getByText('Edit')
    await user.click(editBtn)

    expect(screen.getByTestId('router-location').textContent).toContain(
      `/quizzes/${mockState[0]._id}/edit`
    )
  })

  it('calls deleteQuiz when confirming modal delete button', async () => {
    render(<QuizItem quiz={mockState[0]} />)
    const user = userEvent.setup()

    // Click delete and confirm the modal
    await user.click(screen.getByText('Delete'))
    const { getByText } = within(screen.getByRole('dialog'))
    await user.click(getByText(/yes, delete/i))

    expect(deleteQuizMock).toHaveBeenCalled()
  })
})
