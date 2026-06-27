import React from 'react'

import clone from 'clone'

import { render, screen } from 'util/test-utils'
import { RootState } from 'store/store'
import * as state from 'mocks/state'

import RequireRole from './RequireRole'

describe('RequireRole', () => {
  let mockState: Partial<RootState>

  beforeEach(() => {
    mockState = clone(state)
    mockState.auth!.token = 'token'
    mockState.auth!.isAuthenticated = true
  })

  it('renders children for allowed roles', () => {
    mockState.user!.user!.role = 'teacher'

    render(
      <RequireRole allowedRoles={['teacher']}>
        <p>Allowed</p>
      </RequireRole>,
      mockState,
      '/quizzes/create'
    )

    expect(screen.queryByText('Allowed')).not.toBeNull()
  })

  it('renders a 403 page for disallowed roles and keeps the current path', () => {
    mockState.user!.user!.role = 'student'

    render(
      <RequireRole allowedRoles={['teacher']}>
        <p>Allowed</p>
      </RequireRole>,
      mockState,
      '/quizzes/create'
    )

    expect(
      screen.queryByText(/You are not authorized to view this resource./i)
    ).not.toBeNull()
    expect(screen.getByTestId('router-location').textContent).toContain(
      '/quizzes/create'
    )
  })

  it('renders spinner while user is loading', () => {
    mockState.user!.loading = true

    render(
      <RequireRole allowedRoles={['teacher']}>
        <p>Allowed</p>
      </RequireRole>,
      mockState
    )

    expect(screen.queryByRole('status')).not.toBeNull()
  })
})
