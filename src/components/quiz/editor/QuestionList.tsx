import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'

import Icon from '@mdi/react'
import { mdiAlertCircle } from '@mdi/js'
import { Question, QuestionType } from 'api/models'
import QuestionTypeDropdownButton from './QuestionTypeDropdownButton'
import QuestionEditorList from './QuestionEditorList'
import AddQuestionButton from './AddQuestionButton'

export type Props = {
  editing: boolean
  validate: boolean
  questions: Question[]
  onAdd: (question: Question) => void
  onRemove: (index: number) => void
  onChange: (index: number, question: Question) => void
}

export const displayQuestionType = {
  'Fill in the blank': 'FillIn' as const,
  'Multiple choice': 'MultipleChoice' as const,
}

export const questionTypeDisplay = {
  FillIn: 'Fill in the blank',
  MultipleChoice: 'Multiple choice',
}

/**
 * Presentational component that displays a list of Question components
 */
const QuestionList = ({
  editing,
  validate,
  questions,
  onAdd,
  onRemove,
  onChange,
}: Props) => {
  const [questionType, setQuestionType] = useState<QuestionType>(
    '' as QuestionType
  )

  const onTypeSelected = (eventKey: string | null) =>
    setQuestionType(
      displayQuestionType[eventKey as keyof typeof displayQuestionType]
    )

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
      {validate && questions.length === 0 ? (
        <Row className='mb-2'>
          <Col className=' d-flex align-items-center'>
            <h5 className='text-danger mb-0'>
              Please add at least one question.
            </h5>
            <Icon path={mdiAlertCircle} size={1} color='red' />
          </Col>
        </Row>
      ) : null}
      <QuestionEditorList
        editing={editing}
        validate={validate}
        questions={questions}
        onAdd={onAdd}
        onRemove={onRemove}
        onChange={onChange}
      />
      <Row className='mt-4'>
        <Col className='d-flex align-items-center justify-content-start'>
          <QuestionTypeDropdownButton
            disabled={editing}
            title={
              (questionType.length !== 0 &&
                questionTypeDisplay[questionType]) ||
              'Select Question Type'
            }
            onSelect={onTypeSelected}
          />
          <AddQuestionButton
            onClick={addEmptyQuestion}
            disabled={editing || questionType.length === 0}
          />
        </Col>
      </Row>
    </>
  )
}

export default QuestionList
