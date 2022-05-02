import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from 'util/test-utils'

import { quiz } from 'mocks/state'

import Input from './Input'
import clone from 'clone'
import { MultipleChoiceQuestion } from 'api/models'

describe('Input', () => {
  let mockState: typeof quiz
  beforeEach(() => {
    mockState = clone(quiz)
  })
  it('renders without crashing', () => {
    const questionIndex = 0
    const answers = (
      mockState.questions[questionIndex] as MultipleChoiceQuestion
    ).answers
    const answerIndex = 0
    render(
      <Input
        questionIndex={questionIndex}
        index={answerIndex}
        text={answers[answerIndex].text}
        selected={false}
        onChecked={() => {}}
      />
    )
  })
  it('renders the question index and answer text', () => {
    const questionIndex = 0
    const answers = (
      mockState.questions[questionIndex] as MultipleChoiceQuestion
    ).answers
    const answerIndex = 1
    const text = answers[answerIndex].text
    render(
      <Input
        questionIndex={questionIndex}
        index={answerIndex}
        text={text}
        selected={false}
        onChecked={() => {}}
      />
    )
    expect(screen.getByText(`${answerIndex + 1}. ${text}`)).not.toBeNull()
  })
  it('highlights the answer with answer--selected if selected', () => {
    const questionIndex = 0
    const answers = (
      mockState.questions[questionIndex] as MultipleChoiceQuestion
    ).answers
    const answerIndex = 0
    render(
      <Input
        questionIndex={questionIndex}
        index={answerIndex}
        text={answers[answerIndex].text}
        selected={true}
        onChecked={() => {}}
      />
    )
    expect(
      screen.queryByTestId(`answer-choice-${answerIndex}`)?.classList
    ).toContain('answer--selected')
  })
})
