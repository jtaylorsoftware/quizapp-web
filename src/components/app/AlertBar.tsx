import React from 'react'

import { Alert, Col, Container, Row } from 'react-bootstrap'
import { useAppSelector } from 'hooks'

/**
 * Contains and renders Alert components
 */
const AlertBar = () => {
  const alerts = useAppSelector((state) => state.alerts)

  return (
    <Container data-testid='alertbar' fluid className='alertbar'>
      {alerts.map((alert) => (
        <Row key={alert.id} className='my-1'>
          <Col xs={10} sm={6} className='mx-auto px-0'>
            <Alert variant={alert.type}>{alert.msg}</Alert>
          </Col>
        </Row>
      ))}
    </Container>
  )
}

export default AlertBar
