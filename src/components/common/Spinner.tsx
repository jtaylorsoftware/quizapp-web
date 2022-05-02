import React from 'react'
import { Container } from 'react-bootstrap'

/**
 * Displays a spinner icon for use when an object is loading
 */
const Spinner = () => {
  return (
    <Container fluid className='spinner-container'>
      <div className='spinner spinner-border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </Container>
  )
}

export default Spinner
