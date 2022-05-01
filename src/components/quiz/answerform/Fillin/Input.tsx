import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'

type Props = {
  questionIndex: number
  // Callback for when the user types their input
  onChange: (text: string) => void
}

const Input = ({ questionIndex, onChange }: Props) => {
  const [text, setText] = useState<string>('')
  const question = `question${questionIndex}`
  const id = `${question}fillin`
  return (
    <Row className='mb-2 px-3'>
      <Col>
        <Form.Control
          type='text'
          value={text}
          name={question}
          id={id}
          placeholder={'Answer text...'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value
            setText(value)
            onChange(value)
          }}
        />
      </Col>
    </Row>
  )
}

export default Input
