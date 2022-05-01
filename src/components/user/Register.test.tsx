import React from 'react'

import {
  changeInput,
  fireEvent,
  render,
  screen,
  waitFor,
} from 'util/test-utils'

import { createMemoryHistory } from 'history'

import '@testing-library/jest-dom'

jest.mock('store/auth/thunks')
import { register } from 'store/auth/thunks'

import clone from 'clone'
import * as state from 'mocks/state'
import { RootState } from 'store/store'

import Register from './Register'
import { UserRegistration } from 'api/models'
import { Failure } from 'api/result'

describe('Register', () => {
  let mockState: Partial<RootState>
  const registerMock = jest.mocked(register)

  beforeEach(() => {
    mockState = { auth: clone(state.auth) }
    registerMock.mockClear()
  })

  it('renders without crashing', () => {
    render(<Register />, mockState)
  })

  it('redirects to /dashboard if user is authenticated', () => {
    mockState.auth!.isAuthenticated = true
    const history = createMemoryHistory()
    render(<Register />, mockState, history)
    expect(history.location.pathname).toEqual('/dashboard')
  })

  it('displays any errors from register callback when submitting', async () => {
    mockState.auth!.isAuthenticated = false

    const usernameTakenMsg = 'Username taken'
    const passwordInvalidMsg = 'Password does not meet requirements'
    const emailTakenMsg = 'Email is in use'
    registerMock.mockImplementationOnce(function ({
      username,
      email,
      password,
    }: UserRegistration) {
      return async (dispatch) =>
        new Failure(400, [
          { field: 'username', message: usernameTakenMsg },
          { field: 'password', message: passwordInvalidMsg },
          { field: 'email', message: emailTakenMsg },
        ])
    })

    render(<Register />, mockState)
    const value = 'abc123'.repeat(2)
    changeInput('Username', value)
    changeInput('Password', value)
    changeInput('Confirm Password', value)
    changeInput('Email', value)
    const submitBtn = screen.getByText('Register')
    fireEvent.click(submitBtn)

    expect(registerMock).toHaveBeenCalled()

    await waitFor(() =>
      expect(screen.getByText(usernameTakenMsg)).not.toBeNull()
    )

    await waitFor(() =>
      expect(screen.queryByText(passwordInvalidMsg)).not.toBeNull()
    )

    await waitFor(() =>
      expect(screen.queryByText(emailTakenMsg)).not.toBeNull()
    )
  })
})
