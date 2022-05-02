import React from 'react'
import ScoredQuestion from './ScoredQuestion'
import { FormQuestion, ResultAnswer } from 'api/models'

type Props = {
  questions: FormQuestion[]
  results: ResultAnswer[]
}

/**
 * Displays a list of scored questions
 */
const ScoredQuestionList = ({ questions, results }: Props) => {
  return (
    <>
      {Array.from({ length: questions.length }, (_, index) => {
        const question = questions[index]
        const result = results[index]
        return (
          <ScoredQuestion
            key={index}
            index={index}
            question={question}
            result={result}
          />
        )
      })}
    </>
  )
}

export default ScoredQuestionList
