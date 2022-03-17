import React from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'

import { displayQuestionType } from './QuestionList'

export type DropdownButtonProps = {
  disabled: boolean
  title: string
  onSelect: (key: string | null) => void
}

const QuestionTypeDropdownButton = ({ disabled, title, onSelect }: DropdownButtonProps) => {
  return (
    <>
      <DropdownButton
        size='sm'
        variant='secondary'
        disabled={disabled}
        title={title}
        onSelect={onSelect}
      >
        {
          (Object.keys(displayQuestionType) as Array<keyof typeof displayQuestionType>)
            .map((display, ind) =>
              <Dropdown.Item key={ind} eventKey={display} data-testid={`dropdown-${displayQuestionType[display]}`}>
                {display}
              </Dropdown.Item>)
        }
      </DropdownButton>
    </>
  )
}

export default QuestionTypeDropdownButton