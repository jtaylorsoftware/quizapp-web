import React from 'react'
import clone from 'clone'

import { render, screen } from 'util/test-utils'
vi.mock('util/jwt')
import { tokenIsExpired } from 'util/jwt'
vi.mock('hooks', async (importOriginal) => {
  const actual = await importOriginal<typeof import('hooks')>()
  const { scoredQuiz } = await import('mocks/state')
  return {
    ...actual,
    useQuiz: vi.fn(() => [clone(scoredQuiz), null, false]),
  }
})
import * as state from 'mocks/state'
import { RootState } from 'store/store'

import App from './App'

describe('App', () => {
  const tokenIsExpiredMock = vi.mocked(tokenIsExpired)

  let mockState: Partial<RootState>

  beforeEach(() => {
    tokenIsExpiredMock.mockClear()
    tokenIsExpiredMock.mockReturnValue(false)
    mockState = clone(state)
  })

  const mockStore = {
    alerts: [],
    auth: { token: '', isAuthenticated: false },
  }

  it('renders without crashing', () => {
    render(<App />, mockStore)
  })

  it('starts up at landing page', () => {
    render(<App />, mockStore)
    expect(screen.getByText(/Assessing others/)).toBeInTheDocument()
  })

  it('renders a 403 page for student on /quizzes/create while keeping route path', () => {
    mockState.auth!.token = 'token'
    mockState.auth!.isAuthenticated = true
    mockState.user!.user!.role = 'student'

    render(<App />, mockState, '/quizzes/create')

    expect(
      screen.queryByText(/You are not authorized to view this resource./i)
    ).not.toBeNull()
    expect(screen.getByTestId('router-location').textContent).toContain(
      '/quizzes/create'
    )
  })

  it('renders creator page for teacher on /quizzes/create', () => {
    mockState.auth!.token = 'token'
    mockState.auth!.isAuthenticated = true
    mockState.user!.user!.role = 'teacher'

    render(<App />, mockState, '/quizzes/create')

    expect(screen.queryByRole('button', { name: 'Submit' })).not.toBeNull()
    expect(
      screen.queryByText(/You are not authorized to view this resource./i)
    ).toBeNull()
  })

  it('renders a 403 page for student on /quizzes/:id/edit while keeping route path', () => {
    mockState.auth!.token = 'token'
    mockState.auth!.isAuthenticated = true
    mockState.user!.user!.role = 'student'

    render(<App />, mockState, '/quizzes/quiz-id-0/edit')

    expect(
      screen.queryByText(/You are not authorized to view this resource./i)
    ).not.toBeNull()
    expect(screen.getByTestId('router-location').textContent).toContain(
      '/quizzes/quiz-id-0/edit'
    )
  })

  it('renders quiz editor page for teacher on /quizzes/:id/edit', () => {
    mockState.auth!.token = 'token'
    mockState.auth!.isAuthenticated = true
    mockState.user!.user!.role = 'teacher'

    render(<App />, mockState, '/quizzes/quiz-id-0/edit')

    expect(screen.queryByRole('button', { name: 'Confirm Edits' })).not.toBeNull()
    expect(
      screen.queryByText(/You are not authorized to view this resource./i)
    ).toBeNull()
  })
})
