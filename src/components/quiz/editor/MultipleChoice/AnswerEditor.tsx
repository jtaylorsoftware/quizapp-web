import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

import { MultipleChoiceAnswer as Answer } from 'api/models'

import AnswerText from '../AnswerText'

type Props = {
  id: string
  value: Answer
  index: number
  correct: boolean
  editing: boolean
  validate: boolean
  onChange: (text: string) => void
  onChecked: (checked: boolean) => void
  onRemove: () => void
}

/**
 * Displays an answer with button to remove itself
 */
const AnswerEditor = ({
  id,
  value,
  index,
  correct,
  editing,
  validate,
  onChange,
  onChecked,
  onRemove,
}: Props) => {
  return (
    <>
      <div className={'p-1 answer' + (correct ? ' answer--selected' : '')}>
        <Row className='mt-2 mb-1'>
          <Col className='d-flex align-items-start'>
            <Form.Check
              type='radio'
              className='mb-1'
              name={id}
              id={id}
              value={index}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const checked = e.target.checked
                onChecked(checked)
              }}
              checked={correct}
              disabled={editing}
              label={`${index + 1}.`}
            />

            <Button
              variant='outline-danger'
              size='sm'
              className='ms-auto'
              onClick={onRemove}
              disabled={editing}>
              Delete
            </Button>
          </Col>
        </Row>
        <AnswerText
          defaultValue={value.text}
          validate={validate}
          onChange={onChange}
        />
      </div>
    </>
  )
}

export default AnswerEditor
