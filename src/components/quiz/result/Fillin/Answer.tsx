import React from 'react'
import { Col, Row } from 'react-bootstrap'

export type Props = {
  text: string,
  correct: boolean
}

const Answer = ({ text, correct }: Props) => {
  let border = ''

  if (correct) {
    border = 'answer--correct'
  } else {
    border = 'answer--incorrect'
  }

  return (
    <Row className="mb-2">
      <Col>
        <p className={'answer answer__text py-1 ' + border}>
          Your answer: {text}
        </p>
      </Col>
    </Row>
  )
}

export default Answer