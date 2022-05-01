import React, { useState } from 'react'
import { FillInQuestion, Question } from 'api/models'
import Icon from '@mdi/react'
import { mdiAlertCircle } from '@mdi/js'
import { Col, Form, Row } from 'react-bootstrap'
import QuestionText from '../QuestionText'

type Props = {
  id: string
  label: string
  editing: boolean
  validate: boolean
  value: FillInQuestion
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
  const [answer, setAnswer] = useState<string>(value.correctAnswer)

  return (
    <div>
      <label className='d-flex align-items-center' htmlFor={id}>
        {label}
        {validate && value.correctAnswer.length === 0 ? (
          <span className='px-3 d-inline-flex align-items-center text-danger'>
            Please input the answer text.
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
      <Row className='mb-0'>
        <Col>
          <Form.Control
            type='text'
            placeholder='Answer text...'
            value={answer}
            disabled={editing}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAnswer(e.target.value)
              const updatedQuestion = {
                ...value,
                correctAnswer: e.target.value,
              }
              onChange(updatedQuestion)
            }}
          />
        </Col>
      </Row>
    </div>
  )
}

export default QuestionEditor
