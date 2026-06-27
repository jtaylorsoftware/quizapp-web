import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'

import { Navigate, Link } from 'react-router-dom'

import { register } from 'store/auth/thunks'
import { UserRole } from 'api/models'
import { Failure } from 'api/result'
import { useAppDispatch, useAppSelector } from 'hooks'

type FormError = {
  username?: string
  email?: string
  password?: string
  role?: string
}

const colSize = {
  sm: 8,
  md: 6,
  lg: 5,
  xl: 4,
}
/**
 * Handles user registration through a form.
 */
const Register = () => {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<UserRole | ''>('')
  const [passwordInput, setPasswordInput] = useState({
    password: '',
    passwordConfirm: '',
  })
  const [formError, setFormError] = useState<FormError | null>(null)

  const { password, passwordConfirm } = passwordInput

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormError((prev) => ({ ...prev, username: undefined }))
    setUsername(e.target.value)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormError((prev) => ({ ...prev, email: undefined }))
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormError((prev) => ({ ...prev, password: undefined }))
    setPasswordInput({
      ...passwordInput,
      [e.target.name]: e.target.value,
    })
  }

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormError((prev) => ({ ...prev, role: undefined }))
    setRole(e.target.value as UserRole)
  }

  const handleFailure = (failure: Failure | null) => {
    if (failure != null) {
      const formErrors: FormError = {}
      for (const err of failure.errors) {
        switch (err.field) {
          case 'username':
            formErrors.username = err.message
            break
          case 'email':
            formErrors.email = err.message
            break
          case 'password':
            formErrors.password = err.message
            break
          case 'role':
            formErrors.role = err.message
            break
        }
      }
      setFormError((prev) => ({
        ...prev,
        ...formErrors,
      }))
    }
  }

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!role) {
      setFormError((prev) => ({
        ...prev,
        role: 'Please select a role.',
      }))
      return
    }

    if (password === passwordConfirm) {
      setFormError({ password: undefined, role: undefined })
      dispatch(register({ username, email, password, role })).then(handleFailure)
    } else {
      setFormError({
        password: 'Passwords do not match.',
      })
    }
  }

  if (isAuthenticated) {
    return <Navigate to='/dashboard' replace />
  }

  return (
    <div>
      <Container fluid>
        <Row>
          <Col {...colSize} className='mx-auto'>
            <h2 className='text-center mt-4 mb-4'>Register an account:</h2>
            <Form className='mb-3' onSubmit={submitForm}>
              <fieldset>
                <Form.Group>
                  <Form.Control
                    type='text'
                    className={
                      'mb-2' +
                      (formError && formError.username ? ' is-invalid' : '')
                    }
                    name='username'
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder='Username'
                    minLength={5}
                    maxLength={12}
                    required
                  />
                  {formError && formError.username ? (
                    <div className='invalid-feedback'>
                      {formError && formError.username}
                    </div>
                  ) : null}
                  <Form.Control
                    type='text'
                    className={
                      'mb-2' +
                      (formError && formError.email ? ' is-invalid' : '')
                    }
                    name='email'
                    value={email}
                    onChange={handleEmailChange}
                    placeholder='Email'
                    required
                  />
                  {formError && formError.email ? (
                    <div className='invalid-feedback'>
                      {formError && formError.email}
                    </div>
                  ) : null}
                  <Form.Control
                    type='password'
                    className={
                      'mb-2' +
                      (formError && formError.password ? ' is-invalid' : '')
                    }
                    name='password'
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder='Password'
                    minLength={8}
                    maxLength={20}
                    required
                  />
                  <Form.Control
                    type='password'
                    className={
                      'mb-2 ' +
                      (formError && formError.password ? ' is-invalid' : '')
                    }
                    name='passwordConfirm'
                    value={passwordConfirm}
                    onChange={handlePasswordChange}
                    placeholder='Confirm Password'
                    minLength={8}
                    maxLength={20}
                    required
                  />
                  {formError && formError.password ? (
                    <div className='invalid-feedback'>
                      {formError && formError.password}
                    </div>
                  ) : null}
                  <Form.Group className='mb-2'>
                    <Form.Label>Role</Form.Label>
                    <div
                      className={
                        'rounded border p-3 bg-light' +
                        (formError && formError.role ? ' border-danger' : '')
                      }
                    >
                      <div className='border-bottom mb-2 pb-2'>
                        <Form.Check
                          type='checkbox'
                          id='role-student'
                          label='Student'
                          name='role'
                          value='student'
                          checked={role === 'student'}
                          onChange={handleRoleChange}
                        />
                      </div>
                      <Form.Check
                        type='checkbox'
                        id='role-teacher'
                        label='Teacher'
                        name='role'
                        value='teacher'
                        checked={role === 'teacher'}
                        onChange={handleRoleChange}
                      />
                    </div>
                    {formError && formError.role ? (
                      <div className='invalid-feedback d-block'>
                        {formError && formError.role}
                      </div>
                    ) : null}
                  </Form.Group>
                </Form.Group>
              </fieldset>
              <Button variant='primary' type='submit'>
                Register
              </Button>
            </Form>
            <p>
              Already have an account? <Link to='/login'>Sign in</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Register
