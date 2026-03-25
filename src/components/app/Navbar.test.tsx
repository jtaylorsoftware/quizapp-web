import React from 'react'
import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom'
import { render, screen } from 'util/test-utils'

import Navbar from './Navbar'

import { logout } from 'store/user/thunks'
jest.mock('store/user/thunks')

describe('Navbar', () => {
  const logoutMock = jest.mocked(logout)

  it('renders without crashing', () => {
    const mockStore = {
      alerts: [],
      auth: {
        token: '',
        isAuthenticated: false,
      },
    }

    render(<Navbar />, mockStore)
  })
  it('contains a link to home', () => {
    const mockStore = {
      alerts: [],
      auth: {
        token: '',
        isAuthenticated: false,
      },
    }

    render(<Navbar />, mockStore)
    expect(screen.queryByText('QuizNow')).not.toBeNull()
  })
  it('does not display links for unauthenticated users', () => {
    const mockStore = {
      alerts: [],
      auth: {
        token: '',
        isAuthenticated: false,
      },
    }

    render(<Navbar />, mockStore)
    expect(screen.queryByText('Create')).toBeNull()
    expect(screen.queryByText('Dashboard')).toBeNull()
    expect(screen.queryByText('Logout')).toBeNull()
  })
  it('displays links for authenticated users', () => {
    const mockStore = {
      alerts: [],
      auth: {
        token: '',
        isAuthenticated: true,
      },
    }

    render(<Navbar />, mockStore)
    expect(screen.queryByText('Create')).not.toBeNull()
    expect(screen.queryByText('Dashboard')).not.toBeNull()
    expect(screen.queryByText('Logout')).not.toBeNull()
  })
  it('calls the logout function when logout is clicked', async () => {
    const mockStore = {
      alerts: [],
      auth: {
        token: '',
        isAuthenticated: true,
      },
    }

    render(<Navbar />, mockStore)

    logoutMock.mockReturnValueOnce((dispatch) => {})
    const user = userEvent.setup()

    const logoutBtn = screen.getByText('Logout')
    await user.click(logoutBtn)
    expect(logoutMock).toHaveBeenCalledTimes(1)
  })
})
