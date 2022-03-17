import React from 'react'
import { Button } from 'react-bootstrap'

export type AddQuestionButtonProps = {
  onClick: () => void
  disabled: boolean
}

const AddQuestionButton = ({ onClick, disabled }: AddQuestionButtonProps) => {
  return (
    <>
      <Button
        size='sm'
        variant='primary'
        className='ms-1'
        onClick={onClick}
        disabled={disabled}>
        Add Question
      </Button>
    </>
  )
}

export default AddQuestionButton