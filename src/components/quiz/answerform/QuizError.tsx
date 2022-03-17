import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

type Props = {
  message: string
}

/**
 * Displays an error page to the user indicating they already took the quiz
 */
const QuizError = ({ message }: Props) => {
  return (
    <div className='content d-flex flex-column justify-content-center'>
      <Container fluid>
        <div className='d-flex flex-column align-items-center'>
          <h3>{message}</h3>
          <Link className='mt-3 btn btn-success' to='/dashboard'>
            Back to dashboard
          </Link>
        </div>
      </Container>
    </div>
  )
}

export default QuizError
