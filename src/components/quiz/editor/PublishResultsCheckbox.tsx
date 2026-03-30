import React, { useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap'

type Props = {
  defaultValue: boolean
  onChange: (checked: boolean) => void
  validate: boolean
}

const PublishResultsCheckbox = ({ defaultValue, onChange, validate }: Props) => {
  const [checked, setChecked] = useState(defaultValue)

  return (
    <Row className='mb-4'>
      <Col className='d-flex align-items-center'>
        <Form.Switch
          id='publishResultsCheckbox'
          checked={checked}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const checked = e.target.checked
            setChecked(checked)
            onChange(checked)
          }}
          label={'Publish Results'}
        />
      </Col>
    </Row>
  )
}

export default PublishResultsCheckbox
