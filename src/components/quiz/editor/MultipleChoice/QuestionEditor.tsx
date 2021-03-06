import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

import Icon from '@mdi/react'
import { mdiAlertCircle } from '@mdi/js'

import { v4 as uuid } from 'uuid'

import CorrectAnswerDisplay from './CorrectAnswerDisplay'
import AnswerEditor from './AnswerEditor'

import clone from 'clone'
import { MultipleChoiceQuestion, Question } from 'api/models'
import QuestionText from '../QuestionText'

type Props = {
  id: string
  label: string
  editing: boolean
  validate: boolean
  value: MultipleChoiceQuestion
  onChange: (question: Question) => void
}

const QuestionEditor = ({
  id,
  label,
  editing,
  validate,
  value,
  onChange,
}: Props) => {
  return (
    <div>
      <label className='d-flex align-items-center' htmlFor={id}>
        {label}
        {validate && value.answers.length < 2 ? (
          <span className='px-3 d-inline-flex align-items-center text-danger'>
            Please add at least two answers.
            <Icon path={mdiAlertCircle} size={0.8} color='red' />
          </span>
        ) : null}
      </label>
      <QuestionText
        id={id}
        defaultValue={value.text}
        onChange={(text) => {
          onChange({
            ...value,
            text,
          })
        }}
        validate={validate}
      />
      {value.answers.length > 0 ? (
        <CorrectAnswerDisplay value={value.correctAnswer + 1} />
      ) : null}
      {value.answers.map((answer, answerIndex) => {
        let key: string
        if (answer._id) {
          key = answer._id
        } else {
          key = uuid()
          answer._id = key
        }

        return (
          <AnswerEditor
            key={key}
            id={`${id}-answer-${answerIndex}`}
            value={answer}
            index={answerIndex}
            correct={value.correctAnswer === answerIndex}
            onChange={(text) => {
              const updatedQuestion = {
                ...value,
                answers: clone(value.answers),
              }
              updatedQuestion.answers[answerIndex].text = text
              onChange(updatedQuestion)
            }}
            onChecked={(checked) => {
              if (checked) {
                const updatedQuestion = {
                  ...value,
                  correctAnswer: answerIndex,
                }
                onChange(updatedQuestion)
              }
            }}
            onRemove={() => {
              const updatedQuestion = {
                ...value,
                answers: value.answers.filter((_, ind) => ind !== answerIndex),
              }
              onChange(updatedQuestion)
            }}
            validate={validate}
            editing={editing}
          />
        )
      })}
      <Row className='mt-2'>
        <Col className='d-flex align-items-center justify-content-start'>
          <Button
            variant='outline-secondary'
            size='sm'
            className='me-2'
            onClick={() => {
              const updatedQuestion = {
                ...value,
                answers: [
                  ...value.answers,
                  {
                    text: '',
                  },
                ],
              }
              onChange(updatedQuestion)
            }}
            disabled={editing}>
            Add Answer
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default QuestionEditor
