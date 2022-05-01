import { ResultListing } from 'api/models'
import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom'

type Props = {
  result: ResultListing
}

/**
 * Displays a ResultListing with buttons to navigate to the full Result.
 */
const ResultItem = ({
  result: {
    quiz: quizId,
    user: userId,
    quizTitle: title,
    score,
    ownerUsername: createdBy,
  },
}: Props) => {
  const navigate = useNavigate()
  const goToResult = () => {
    navigate(`/results?quiz=${quizId}&user=${userId}`)
  }
  return (
    <>
      <Row className='mb-1 align-items-center'>
        <Col className='d-flex align-items-center justify-content-start'>
          <h4 className='mb-0'>{title}</h4>
        </Col>
        <Col className='d-flex align-items-center justify-content-end'>
          <Button
            variant='primary'
            size='sm'
            className='ms-1'
            onClick={() => goToResult()}>
            Details
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <small className='text-muted text-start'>by {createdBy} </small>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className='mb-1'>Score: {(score * 100.0).toFixed(2)}%</p>
        </Col>
      </Row>
    </>
  )
}

export default ResultItem
