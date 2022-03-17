import React from 'react'

import PropTypes from 'prop-types'
import { Container } from 'react-bootstrap'

interface Props {
  status: number
}

/**
 * Displays an error page/splash
 */
const ErrorPage = ({ status }: Props) => {
  let message = ''
  switch (status) {
    case 404:
      message = 'That resource wasn\'t found.'
      break
    case 401:
    case 403:
      message = 'You are not authorized to view this resource.'
      break
    case 500:
      message = 'Internal server error.'
      break
    default:
      message = ''
  }
  return (
    <div className='content d-flex flex-column justify-content-center'>
      <Container fluid>
        <div className='d-flex flex-column align-items-center'>
          <h1>{status}</h1>
          <p className='mt-3'>{message}</p>
        </div>
      </Container>
    </div>
  )
}

ErrorPage.propTypes = {
  status: PropTypes.number.isRequired,
}

export default ErrorPage
