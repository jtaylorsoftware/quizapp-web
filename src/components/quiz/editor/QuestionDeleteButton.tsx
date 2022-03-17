import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'

export type DeleteButtonProps = {
  index: number
  editing: boolean
  onRemove: (index: number) => void
}

const QuestionDeleteButton = ({ index, onRemove, editing }: DeleteButtonProps) => {
  return (
    <>
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
    </>
  )
}

export default QuestionDeleteButton