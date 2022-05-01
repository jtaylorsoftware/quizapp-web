import React from 'react'

import { FormQuestion } from 'api/models'

import Question from './Question'
import { OnAnswerChanged } from './onanswerchanged'
import { Failure } from 'api/result'

type Props = {
  /**
   * Possible error from submitting quiz
   */
  error?: Failure | null

  questions: FormQuestion[]

  /**
   * Callback for when the answer choice for a question changes.
   */
  onAnswerChanged: OnAnswerChanged
}

/**
 * Displays the questions to the quiz answer form
 */
const QuestionList = ({ error, questions, onAnswerChanged }: Props) => {
  return (
    <div data-testid='questionlist'>
      {questions.map((question, index) => (
        <Question
          key={index}
          index={index}
          question={question}
          onAnswerChanged={onAnswerChanged}
          highlightMissing={!!error && error.status === 400}
        />
      ))}
    </div>
  )
}

export default QuestionList
