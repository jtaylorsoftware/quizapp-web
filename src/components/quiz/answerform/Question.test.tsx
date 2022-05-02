import React from 'react'

import '@testing-library/jest-dom'
import { fireEvent, render, screen } from 'util/test-utils'

import { quiz } from 'mocks/state'
import clone from 'clone'

import Question from './Question'
import { MultipleChoiceQuestion } from 'api/models'

describe('Question', () => {
  let mockState: typeof quiz
  beforeEach(() => {
    mockState = clone(quiz)
  })

  it('renders without crashing', () => {
    const questionIndex = 0
    const question = mockState.questions[questionIndex]
    render(
      <Question
        index={questionIndex}
        question={question}
        highlightMissing={false}
        onAnswerChanged={() => {}}
      />
    )
  })

  it('displays the question number and text', () => {
    const questionIndex = 0
    const question = mockState.questions[questionIndex]
    render(
      <Question
        index={questionIndex}
        question={question}
        highlightMissing={false}
        onAnswerChanged={() => {}}
      />
    )
    expect(
      screen.queryByText(`${questionIndex + 1}. ${question.text}`)
    ).not.toBeNull()
  })

  it('renders whatever answers are given', () => {
    const questionIndex = 0
    const question = mockState.questions[
      questionIndex
    ] as MultipleChoiceQuestion
    const answers = question.answers
    render(
      <Question
        index={questionIndex}
        question={question}
        highlightMissing={true}
        onAnswerChanged={() => {}}
      />
    )
    expect(screen.queryAllByTestId(/answer-choice/)).toHaveLength(
      answers.length
    )
  })

  it('does not display an error if an answer is selected', () => {
    const questionIndex = 0
    const question = mockState.questions[
      questionIndex
    ] as MultipleChoiceQuestion
    const answers = question.answers
    render(
      <Question
        index={questionIndex}
        question={question}
        highlightMissing={true}
        onAnswerChanged={() => {}}
      />
    )
    const answerInput = screen.getByLabelText(`1. ${answers[0].text}`)
    fireEvent.click(answerInput)
    expect(screen.queryByText(/please select an answer/i)).toBeNull()
  })

  it('displays an error message if no answer is selected', () => {
    const questionIndex = 0
    const question = mockState.questions[
      questionIndex
    ] as MultipleChoiceQuestion
    const answers = question.answers
    render(
      <Question
        index={questionIndex}
        question={question}
        highlightMissing={true}
        onAnswerChanged={() => {}}
      />
    )
    expect(screen.queryByText(/please input or choose/i)).not.toBeNull()
  })
})
