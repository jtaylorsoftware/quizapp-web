import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'

import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'
import { ResultListing } from 'api/models'

type Props = {
  result: ResultListing
}

/**
 * Displays the brief info for a user's quiz result
 */
const ResultItem = ({
  result: { quiz: quizId, user: userId, username, score },
}: Props) => {
  const navigate = useNavigate()
  const goToResult = () => {
    navigate(`/results?quiz=${quizId}&user=${userId}`)
  }

  return (
    <>
      <Row className='mb-1 align-items-center'>
        <Col className='d-flex align-items-center justify-content-start'>
          <h5 className='mb-0'>Results for {username}:</h5>
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
          <p className='mb-1'>Score: {(score * 100.0).toFixed(2)}%</p>
        </Col>
      </Row>
    </>
  )
}

ResultItem.propTypes = {
  result: PropTypes.object.isRequired,
}

export default ResultItem
