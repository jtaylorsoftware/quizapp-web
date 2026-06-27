import React from 'react'
import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from 'util/test-utils'

vi.mock('store/auth/thunks')
import { register } from 'store/auth/thunks'

import clone from 'clone'
import * as state from 'mocks/state'
import { RootState } from 'store/store'

import Register from './Register'
import { UserRegistration } from 'api/models'
import { Failure } from 'api/result'

const fillValidRegistrationForm = async (user: ReturnType<typeof userEvent.setup>) => {
  const value = 'abc123'.repeat(2)
  await user.type(screen.getByPlaceholderText('Username'), value)
  await user.type(screen.getByPlaceholderText('Password'), value)
  await user.type(screen.getByPlaceholderText('Confirm Password'), value)
  await user.type(screen.getByPlaceholderText('Email'), value)

  return value
}

describe('Register', () => {
  let mockState: Partial<RootState>
  const registerMock = vi.mocked(register)

  beforeEach(() => {
    mockState = { auth: clone(state.auth) }
    registerMock.mockClear()
  })

  it('renders without crashing', () => {
    render(<Register />, mockState)
  })

  it('redirects to /dashboard if user is authenticated', () => {
    mockState.auth!.isAuthenticated = true
    render(<Register />, mockState)
    expect(screen.getByTestId('router-location').textContent).toContain(
      '/dashboard'
    )
  })

  it('displays any errors from register callback when submitting', async () => {
    mockState.auth!.isAuthenticated = false
    const user = userEvent.setup()

    const usernameTakenMsg = 'Username taken'
    const passwordInvalidMsg = 'Password does not meet requirements'
    const emailTakenMsg = 'Email is in use'
    registerMock.mockImplementationOnce(function ({
      username,
      email,
      password,
      role,
    }: UserRegistration) {
      return async (dispatch) =>
        new Failure(400, [
          { field: 'username', message: usernameTakenMsg },
          { field: 'password', message: passwordInvalidMsg },
          { field: 'email', message: emailTakenMsg },
          { field: 'role', message: role },
        ])
    })

    render(<Register />, mockState)
    await fillValidRegistrationForm(user)
    await user.click(screen.getByLabelText('Student'))
    const submitBtn = screen.getByText('Register')
    await user.click(submitBtn)

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

    await waitFor(() => expect(screen.queryByText('student')).not.toBeNull())
  })

  it('does not submit before selecting a role', async () => {
    mockState.auth!.isAuthenticated = false
    const user = userEvent.setup()

    render(<Register />, mockState)
    await fillValidRegistrationForm(user)
    await user.click(screen.getByText('Register'))

    expect(registerMock).not.toHaveBeenCalled()
    expect(screen.queryByText('Please select a role.')).not.toBeNull()
  })

  it('submits selected role in registration payload', async () => {
    mockState.auth!.isAuthenticated = false
    const user = userEvent.setup()

    registerMock.mockImplementationOnce((registration: UserRegistration) => {
      return async (dispatch) => null
    })

    render(<Register />, mockState)
    await fillValidRegistrationForm(user)
    await user.click(screen.getByLabelText('Teacher'))
    await user.click(screen.getByText('Register'))

    await waitFor(() => expect(registerMock).toHaveBeenCalledTimes(1))
    expect(registerMock).toHaveBeenCalledWith(
      expect.objectContaining({ role: 'teacher' })
    )
  })
})
