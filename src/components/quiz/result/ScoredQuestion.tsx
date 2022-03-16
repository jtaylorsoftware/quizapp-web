import React from 'react'
import { Row, Col } from 'react-bootstrap'

import { FillInResult, FormQuestion, MultipleChoiceResult, ResultAnswer } from 'api'

import MultipleChoiceAnswer from './MultipleChoice/Answer'
import FillInAnswer from './Fillin/Answer'

type Props = {
  index: number
  result: ResultAnswer
  question: FormQuestion
}

type BodyProps = {
  result: ResultAnswer
  question: FormQuestion
}

/**
 * Displays the scored answer(s) from a question
 */
const QuestionBody = ({ question, result }: BodyProps) => {
  if (question.type === 'FillIn') {
    const isCorrect = result.isCorrect ?? false

    return (
      <>
        {(result as FillInResult).correctAnswer !== undefined ? (
          <Row className='mb-4'>
            <Col className='d-flex align-items-center'>
              <h5 className='mb-0'>
                Correct answer: {(result as FillInResult).correctAnswer!!}
              </h5>
            </Col>
          </Row>
        ) : null}
        <FillInAnswer text={(result as FillInResult).answer} correct={isCorrect} />
      </>
    )
  } else {
    return <>
      {(result as MultipleChoiceResult).correctAnswer !== undefined ? (
        <Row className='mb-4'>
          <Col className='d-flex align-items-center'>
            <h5 className='mb-0'>
              Correct answer: {(result as MultipleChoiceResult).correctAnswer!! + 1}
            </h5>
          </Col>
        </Row>
      ) : null}
      {question.answers.map((answer, index) => {
        let isCorrect: boolean
        const selected = (result as MultipleChoiceResult).choice === index
        if (result.correctAnswer !== undefined) {
          isCorrect = result.correctAnswer === index
        } else {
          isCorrect = (result.isCorrect ?? false) && selected
        }
        return (
          <MultipleChoiceAnswer
            key={index}
            index={index}
            text={answer.text}
            correct={isCorrect}
            selected={selected}
          />
        )
      })}
    </>
  }
}

/**
 * Displays a single scored question from a quiz
 */
const ScoredQuestion = (
  {
    index: questionIndex,
    question,
    result,
  }: Props) => {
  return (
    <Row className='mb-4'>
      <Col>
        <h3 className='mb-2'>
          {questionIndex + 1}. {question.text}
        </h3>
        <QuestionBody result={result} question={question} />
      </Col>
    </Row>
  )
}

export default ScoredQuestion
