import React, { useState } from 'react'
import Icon from '@mdi/react'
import { mdiAlertCircle } from '@mdi/js'
import { FormQuestion } from 'api'
import { Col, Row } from 'react-bootstrap'

import MultipleChoiceInput from './MultipleChoice/Input'
import FillInInput from './Fillin/Input'
import { OnAnswerChanged, ResponseValue } from './onanswerchanged'


type Props = {
  index: number
  question: FormQuestion
  highlightMissing: boolean

  // Callback for when the answer choice for a question changes.
  onAnswerChanged: OnAnswerChanged
}

type BodyProps = {
  questionIndex: number
  question: FormQuestion
  currentAnswer: ResponseValue
  onAnswerChanged: OnAnswerChanged
}

/**
 * Displays the inputs for a Question based on its type.
 */
const QuestionBody = ({ questionIndex, question, currentAnswer, onAnswerChanged }: BodyProps) => {
  if (question.type === 'FillIn') {
    return <FillInInput questionIndex={questionIndex} onChange={
      (text: string) => {
        onAnswerChanged(text, questionIndex)
      }
    }  />
  } else {
    return <>
      {question.answers.map((answer, index) => (
        <MultipleChoiceInput
          key={index}
          questionIndex={questionIndex}
          index={index}
          text={answer.text}
          selected={currentAnswer !== null && currentAnswer === index}
          onChecked={() => onAnswerChanged(index, questionIndex)}
        />
      ))}
    </>
  }
}

/**
 * Displays one Question from a quiz.
 */
const Question = (
  {
    index: questionIndex,
    question,
    highlightMissing,
    onAnswerChanged,
  }: Props) => {
  const [answer, setAnswer] = useState<ResponseValue>()

  const selectAnswer: OnAnswerChanged = (answer, questionIndex) => {
    setAnswer(answer)
    onAnswerChanged(answer, questionIndex)
  }
  return (
    <Row>
      <Col>
        <h2 className='mb-0'>
          {questionIndex + 1}. {question.text}{' '}
        </h2>
        {answer == null && highlightMissing ? (
          <Row className='mb-2'>
            <Col className='d-flex align-items-center'>
              <h5 className='text-danger mb-0'>Please input or choose an answer. </h5>
              <Icon path={mdiAlertCircle} size={1} color='red' />
            </Col>
          </Row>
        ) : null}
        <QuestionBody
          questionIndex={questionIndex}
          question={question}
          currentAnswer={answer}
          onAnswerChanged={selectAnswer} />
      </Col>
    </Row>
  )
}

export default Question
