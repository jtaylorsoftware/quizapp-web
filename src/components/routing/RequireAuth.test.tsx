import React from 'react'

import '@testing-library/jest-dom'
import { render, screen } from 'util/test-utils'

import { createMemoryHistory } from 'history'
jest.mock('util/jwt')
import { tokenIsExpired } from 'util/jwt'

import RequireAuth from './RequireAuth'
import { AuthState } from 'store/auth/types'
import { UserState } from 'store/user/types'

describe('RequireAuth', () => {
  const tokenIsExpiredMock = jest.mocked(tokenIsExpired)
  const mockAuth: AuthState = {
    token: '',
    isAuthenticated: false,
  }
  const mockUser: UserState = {
    loading: false,
    error: null,
    user: {
      _id: 'id',
      date: 'date',
      username: 'username',
      email: 'email@email.com',
      quizzes: [],
      results: [],
    },
  }
  beforeEach(() => {
    tokenIsExpiredMock.mockClear()
  })

  it('renders without crashing', () => {
    const mockStore = {
      auth: mockAuth,
    }
    render(<RequireAuth redirectTo='/login' />, mockStore)
  })

  it('does not render if authenticated but token is expired', () => {
    const mockStore = {
      auth: {
        ...mockAuth,
        isAuthenticated: true,
      },
    }
    tokenIsExpiredMock.mockReturnValueOnce(true)
    const history = createMemoryHistory()
    render(<RequireAuth redirectTo='/login' />, mockStore, history)
    expect(tokenIsExpiredMock).toHaveBeenCalled()
    expect(history.location.pathname).toEqual('/login')
  })

  it('calls/renders the render prop when user is authenticated and not loading', () => {
    const mockStore = {
      auth: {
        ...mockAuth,
        isAuthenticated: true,
      },
      user: mockUser,
    }
    render(
      <RequireAuth redirectTo='/login'>
        <p>Success</p>
      </RequireAuth>,
      mockStore
    )
    expect(screen.queryByText('Success')).not.toBeNull()
  })

  it('renders spinner if authenticated but user is loading', () => {
    const mockStore = {
      auth: {
        ...mockAuth,
        isAuthenticated: true,
      },
      user: {
        ...mockUser,
        loading: true,
      },
    }
    render(<RequireAuth redirectTo='/login' />, mockStore)
    expect(screen.queryByRole('status')).not.toBeNull()
  })

  it('redirects the user if not authenticated', () => {
    const mockStore = {
      auth: mockAuth,
    }
    const history = createMemoryHistory()
    render(<RequireAuth redirectTo='/login' />, mockStore, history)
    expect(history.location.pathname).toEqual('/login')
  })
})
