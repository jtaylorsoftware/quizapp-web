import React from 'react'

import { render, screen } from 'util/test-utils'

import clone from 'clone'

import * as state from 'mocks/state'

import Dashboard from './Dashboard'
import { RootState } from 'store/store'

vi.mock('hooks', async (importOriginal) => {
  const actual = await importOriginal<typeof import('hooks')>()
  return {
    ...actual,
    useDashboard: vi.fn(() => ({
      quizzes: { loading: false, data: [] },
      results: { loading: false, data: [] },
    })),
  }
})

describe('Dashboard', () => {
  let mockState: Partial<RootState>
  beforeEach(() => {
    mockState = clone(state)
  })
  it('renders without crashing', () => {
    render(<Dashboard />, mockState)
  })
  it('renders a spinner if user is loading', () => {
    mockState.user!.loading = true
    mockState.auth!.isAuthenticated = true
    render(<Dashboard />, mockState)
    expect(screen.queryByRole('status')).not.toBeNull()
  })

  it('renders user info', () => {
    mockState.auth!.isAuthenticated = true
    render(<Dashboard />, mockState)
    expect(screen.queryByText(/hello/i)).not.toBeNull()
    expect(screen.queryByText(/email:/i)).not.toBeNull()
    expect(screen.queryByText(/joined/i)).not.toBeNull()
  })
  it('renders the quiz list', () => {
    mockState.auth!.isAuthenticated = true
    render(<Dashboard />, mockState)
    expect(screen.queryByText(/quizzes you created/i)).not.toBeNull()
  })
  it('renders the result list', () => {
    mockState.auth!.isAuthenticated = true
    render(<Dashboard />, mockState)
    expect(screen.queryByText(/your quiz results/i)).not.toBeNull()
  })
})
