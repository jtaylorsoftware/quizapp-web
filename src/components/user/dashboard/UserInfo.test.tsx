import React from 'react'
import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom'
import { render, screen, within } from 'util/test-utils'

import clone from 'clone'

jest.mock('store/user/thunks')
import { deleteUser } from 'store/user/thunks'

import { dateToLongLocaleString } from 'util/date'

import * as state from 'mocks/state'

import UserInfo from './UserInfo'

describe('UserInfo', () => {
  const deleteUserMock = jest
    .mocked(deleteUser)
    .mockReturnValue(async (dispatch) => {})
  let mockState: typeof state

  beforeEach(() => {
    deleteUserMock.mockClear()
    mockState = clone(state)
  })

  it('renders without crashing', () => {
    render(<UserInfo />, mockState)
  })

  it('renders the email form', () => {
    render(<UserInfo />, mockState)
    expect(screen.queryByText(/change email/i)).not.toBeNull()
  })

  it('renders the password form', () => {
    render(<UserInfo />, mockState)
    expect(screen.queryByText(/change password/i)).not.toBeNull()
  })

  it('renders the delete account button', () => {
    render(<UserInfo />, mockState)
    expect(screen.queryByText(/delete account/i)).not.toBeNull()
  })

  it("renders the user's username", () => {
    render(<UserInfo />, mockState)
    expect(
      screen.queryByText(RegExp(`${mockState.user.user?.username}`))
    ).not.toBeNull()
  })

  it("renders the user's email", () => {
    render(<UserInfo />, mockState)
    expect(
      screen.queryByText(RegExp(`${mockState.user.user?.email}`))
    ).not.toBeNull()
  })

  it("renders the user's registration date", () => {
    render(<UserInfo />, mockState)
    const date = dateToLongLocaleString(mockState.user.user!.date)
    expect(screen.getByText(date)).not.toBeNull()
  })

  it('calls deleteQuiz when confirming modal delete button', async () => {
    render(<UserInfo />, mockState)
    const user = userEvent.setup()

    // Click delete and confirm the modal
    await user.click(screen.getByText(/delete account/i))
    const { getByText } = within(screen.getByRole('dialog'))
    await user.click(getByText(/yes, delete/i))

    expect(deleteUserMock).toHaveBeenCalled()
  })
})
