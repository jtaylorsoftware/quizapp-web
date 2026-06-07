import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'

import { Navigate, Link, useLocation } from 'react-router-dom'

import { login } from 'store/auth/thunks'
import { Failure } from 'api/result'
import { useAppDispatch, useAppSelector } from 'hooks'

const colSize = {
  sm: 8,
  md: 6,
  lg: 5,
  xl: 4,
}

interface LocationState {
  referrer: string
}

const Login = () => {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const location = useLocation()
  const referrer = (location.state as LocationState | null | undefined)
    ?.referrer

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [usernameError, setUsernameError] = useState<string | undefined>(
    undefined
  )
  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined
  )

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameError(undefined)
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordError(undefined)
    setPassword(e.target.value)
  }

  const handleFailure = (error: Failure | null) => {
    if (error && error.status === 400) {
      for (const err of error.errors) {
        if (err.field === 'username') {
          setUsernameError(err.message)
        }
        if (err.field === 'password') {
          setPasswordError(err.message)
        }
      }
    }
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUsernameError(undefined)
    setPasswordError(undefined)
    dispatch(login({ username, password })).then((result) => handleFailure(result))
  }

  if (isAuthenticated) {
    if (referrer) {
      return <Navigate to={referrer} replace />
    }
    return <Navigate to='/dashboard' replace />
  }

  return (
    <div className='content'>
      <Container fluid>
        <Row>
          <Col {...colSize} className='mx-auto'>
            <h2 className='text-center mt-4 mb-4'>Sign in:</h2>
            <Form className='mb-3' onSubmit={onSubmit}>
              <fieldset>
                <Form.Group>
                  <Form.Control
                    type='text'
                    className={'my-2' + (usernameError ? ' is-invalid' : '')}
                    name='username'
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder='Username'
                    required
                  />
                  {usernameError ? (
                    <div className='invalid-feedback'>{usernameError}</div>
                  ) : null}
                  <Form.Control
                    type='password'
                    className={'my-2' + (passwordError ? ' is-invalid' : '')}
                    name='password'
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder='Password'
                    required
                  />
                  {passwordError ? (
                    <div className='invalid-feedback'>{passwordError}</div>
                  ) : null}
                </Form.Group>
              </fieldset>
              <Button variant='primary' type='submit'>
                Login
              </Button>
            </Form>
            <p>
              Don't have an account? <Link to='/register'>Register</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login
