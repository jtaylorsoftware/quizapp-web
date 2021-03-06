import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from 'util/test-utils'

import moment from 'moment'

jest.mock('hooks/useQuiz')
import { useQuiz } from 'hooks/useQuiz'

jest.mock('hooks/useResult')
import { useResultList } from 'hooks/useResult'

import { Quiz, ResultListing } from 'api/models'

import QuizResultList from './QuizResultList'

describe('QuizResultList', () => {
  const mockUseQuiz = jest.mocked(useQuiz)
  const mockUseResultList = jest.mocked(useResultList)
  const mockQuiz: Quiz = {
    _id: 'quizid0',
    title: 'My Quiz',
    date: moment().toISOString(),
    isPublic: true,
    allowedUsers: [],
    expiration: moment().add(1, 'd').toISOString(),
    questions: [],
  }
  const mockResults: ResultListing[] = [
    {
      _id: 'resultid0',
      date: moment().toISOString(),
      user: 'userid1',
      quiz: 'quizid0',
      quizTitle: 'quiz0',
      ownerUsername: 'username0',
      score: 0,
      username: 'foobar',
    },
  ]
  it('renders witout crashing', () => {
    mockUseQuiz.mockReturnValueOnce([mockQuiz, null, false])
    mockUseResultList.mockReturnValueOnce([mockResults, null, false])
    render(<QuizResultList />)
  })

  it('renders a spinner if quiz is loading', () => {
    mockUseQuiz.mockReturnValueOnce([null, null, true])
    mockUseResultList.mockReturnValueOnce([mockResults, null, false])
    render(<QuizResultList />)
    expect(screen.queryByRole('status')).not.toBeNull()
  })

  it('renders a spinner if results are loading', () => {
    mockUseResultList.mockReturnValueOnce([null, null, true])
    mockUseQuiz.mockReturnValueOnce([null, null, true])
    render(<QuizResultList />)
    expect(screen.queryByRole('status')).not.toBeNull()
  })

  it('renders an error page if quiz has an error', () => {
    mockUseQuiz.mockReturnValueOnce([null, { status: 404, errors: [] }, false])
    mockUseResultList.mockReturnValueOnce([mockResults, null, false])
    render(<QuizResultList />)
    expect(screen.queryByText(/404/)).not.toBeNull()
  })

  it('renders an error page if results has an error', () => {
    mockUseQuiz.mockReturnValueOnce([mockQuiz, null, false])
    mockUseResultList.mockReturnValueOnce([
      null,
      { status: 404, errors: [] },
      false,
    ])
    render(<QuizResultList />)
    expect(screen.queryByText(/404/)).not.toBeNull()
  })

  it('displays the quiz title headline', () => {
    mockUseQuiz.mockReturnValueOnce([mockQuiz, null, false])
    mockUseResultList.mockReturnValueOnce([mockResults, null, false])
    render(<QuizResultList />)
    expect(screen.queryByText(RegExp(`${mockQuiz.title}`))).not.toBeNull()
  })

  it('displays a message if nobody has responded to the quiz', () => {
    mockUseQuiz.mockReturnValueOnce([mockQuiz, null, false])
    mockUseResultList.mockReturnValueOnce([[], null, false])
    render(<QuizResultList />)
    expect(screen.queryByText(/nobody has responded/i)).not.toBeNull()
  })

  it('should render a ResultItem for each result', () => {
    mockUseQuiz.mockReturnValueOnce([mockQuiz, null, false])
    mockUseResultList.mockReturnValueOnce([mockResults, null, false])
    render(<QuizResultList />)
    expect(screen.queryAllByText(/details/i)).toHaveLength(mockResults.length)
  })
})
