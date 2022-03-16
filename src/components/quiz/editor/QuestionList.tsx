import React, { useState } from 'react'
import { Button, Col, Dropdown, DropdownButton, Row } from 'react-bootstrap'

import Icon from '@mdi/react'
import { mdiAlertCircle } from '@mdi/js'

import { v4 as uuid } from 'uuid'

import QuestionEditor from './QuestionEditor'
import { Question, QuestionType } from 'api'

export type Props = {
  editing: boolean
  validate: boolean
  value: Question[]
  onAdd: (question: Question) => void
  onRemove: (index: number) => void
  onChange: (index: number, question: Question) => void
}

export const displayQuestionType = {
  'Fill in the blank': 'FillIn' as const,
  'Multiple choice': 'MultipleChoice' as const,
}

export const questionTypeDisplay = {
  'FillIn': 'Fill in the blank',
  'MultipleChoice': 'Multiple choice',
}

/**
 * Presentational component that displays a list of Question components
 */
const QuestionList = (
  {
    editing,
    validate,
    value,
    onAdd,
    onRemove,
    onChange,
  }: Props) => {
  const [questionType, setQuestionType] = useState<QuestionType>('' as QuestionType)

  const onTypeSelected = (eventKey: string | null) =>
    setQuestionType(displayQuestionType[eventKey as keyof typeof displayQuestionType])

  const addEmptyQuestion = () => {
    let question: Question
    if (questionType === 'FillIn') {
      question = {
        type: questionType,
        text: '',
        correctAnswer: '',
      }
    } else {
      question = {
        type: questionType,
        text: '',
        correctAnswer: 0,
        answers: [],
      }
    }
    onAdd(question)
  }
  return (
    <>
      {validate && value.length === 0 ? (
        <Row className='mb-2'>
          <Col className=' d-flex align-items-center'>
            <h5 className='text-danger mb-0'>
              Please add at least one question.
            </h5>
            <Icon path={mdiAlertCircle} size={1} color='red' />
          </Col>
        </Row>
      ) : null}
      {value.map((question, index) => {
        let key: string
        if (question._id) {
          key = question._id
        } else {
          key = uuid()
          question._id = key
        }
        return (
          <div key={key}>
            <QuestionEditor
              id={`question-${index}`}
              label={`Question ${index + 1} (${questionTypeDisplay[question.type]}):`}
              editing={editing}
              validate={validate}
              value={question}
              onChange={question => {
                onChange(index, question)
              }}
              onRemove={() => {
                onRemove(index)
              }}
            />
            <Row className='mt-2'>
              <Col className='d-flex align-items-center justify-content-start'>
                <Button
                  variant='outline-danger'
                  size='sm'
                  className='me-2'
                  onClick={() => {
                    onRemove(index)
                  }}
                  disabled={editing}>
                  Delete Question
                </Button>
              </Col>
            </Row>
          </div>
        )
      })}
      <Row className='mt-4'>
        <Col className='d-flex align-items-center justify-content-start'>
          <DropdownButton
            size='sm'
            variant='secondary'
            disabled={editing}
            title={(questionType.length !== 0 && questionTypeDisplay[questionType]) || 'Select Question Type'}
            onSelect={onTypeSelected}
          >
            {
              (Object.keys(displayQuestionType) as Array<keyof typeof displayQuestionType>)
                .map((display, ind) =>
                  <Dropdown.Item key={ind} eventKey={display} data-testid={`dropdown-${displayQuestionType[display]}`}>
                    {display}
                  </Dropdown.Item>)
            }
          </DropdownButton>
          <Button
            size='sm'
            variant='primary'
            className='ms-1'
            onClick={addEmptyQuestion}
            disabled={editing || questionType.length === 0}>
            Add Question
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default QuestionList
