import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from 'util/test-utils'

import clone from 'clone'
import { quiz } from 'mocks/state'

import QuestionList from './QuestionList'

describe('QuestionList', () => {
  const error400 = { status: 400, errors: [] }
  let mockState: typeof quiz
  beforeEach(() => {
    mockState = clone(quiz)
  })
  it('renders without crashing', () => {
    render(<QuestionList questions={mockState.questions} onAnswerChanged={() => {}} />)
  })
  it('should display questions with errors when error state is not null', () => {
    render(
      <QuestionList
        error={error400}
        questions={mockState.questions}
        onAnswerChanged={() => {}}
      />
    )
    expect(screen.queryAllByText(/please input or choose/i)).toHaveLength(
      mockState.questions.length
    )
  })
})
