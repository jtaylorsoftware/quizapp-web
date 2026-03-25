import React from 'react'
import userEvent, { type UserEvent } from '@testing-library/user-event'

import '@testing-library/jest-dom'
import {
  render,
  screen,
  waitFor,
  within,
} from 'util/test-utils'

import PasswordForm from './PasswordForm'

describe('PasswordForm', () => {
  const mockChangeUserPassword = jest.fn(async (password) => {
    return null
  })

  const renderForm = () =>
    render(
      <PasswordForm
        changePassword={(password) => mockChangeUserPassword(password)}
      />
    )

  it('renders without crashing', () => {
    renderForm()
  })

  it('opens the form when the change button is clicked', async () => {
    const user = userEvent.setup()
    renderForm()
    await openForm(user)
    expect(getPasswordInput()).not.toBeNull()
  })

  it('closes the form when the cancel button is clicked', async () => {
    const user = userEvent.setup()
    renderForm()
    await openForm(user)
    await cancel(user)
    expect(getPasswordInput()).toBeNull()
  })

  it('closes the form when the cancel button is clicked', async () => {
    const user = userEvent.setup()
    renderForm()
    await openForm(user)
    const cancelBtn = screen.getByText('Cancel')
    await user.click(cancelBtn)
    expect(getPasswordInput()).toBeNull()
  })

  it('shows an error if passwords do not match', async () => {
    const user = userEvent.setup()
    renderForm()
    await openForm(user)
    await fillOutForm(user, newPassword, newPassword + 'foo')
    await submit(user)
    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument()
  })

  it('shows an error if first password input is empty', async () => {
    const user = userEvent.setup()
    renderForm()
    await openForm(user)
    await fillOutForm(user, '', newPassword)
    await submit(user)
    expect(screen.getByText(/please enter a password/i)).toBeInTheDocument()
  })

  it('shows an error if confirmation input is empty', async () => {
    const user = userEvent.setup()
    renderForm()
    await openForm(user)
    await fillOutForm(user, newPassword, '')
    await submit(user)
    expect(screen.queryByText(/please enter a password/i)).toBeInTheDocument()
  })

  it('opens the confirmation modal if passwords match', async () => {
    const user = userEvent.setup()
    renderForm()
    await openForm(user)
    await fillOutForm(user, newPassword, newPassword)
    await submit(user)
    expect(screen.queryByTestId('confirm-modal')).toBeInTheDocument()
  })

  it('calls changeUserPassword when modal is confirmed', async () => {
    const user = userEvent.setup()
    renderForm()
    await openForm(user)
    await fillOutForm(user, newPassword, newPassword)
    await submit(user)
    await confirm(user)
    await waitFor(() => expect(mockChangeUserPassword).toHaveBeenCalled())
  })
})

const newPassword = 'password'

const openForm = async (user: UserEvent) => {
  await user.click(screen.getByText('Change Password'))
}

const getPasswordInput = () => {
  return screen.queryByPlaceholderText('New password')
}

const changePasswordInput = async (
  user: UserEvent,
  password: string
) => {
  const input = screen.getByPlaceholderText('New password')
  await user.clear(input)
  if (password)
  {
    await user.type(input, password)
  }
}

const changeConfirmInput = async (
  user: UserEvent,
  password: string
) => {
  const input = screen.getByPlaceholderText('Confirm new password')
  await user.clear(input)
  if (password)
  {
    await user.type(input, password)
  }
}

const cancel = async (user: UserEvent) => {
  await user.click(screen.getByText('Cancel'))
}

const submit = async (user: UserEvent) => {
  await user.click(screen.getByText('Change'))
}

const confirm = async (user: UserEvent) => {
  const { getByText } = within(screen.getByRole('dialog'))
  await user.click(getByText('Confirm'))
}

const fillOutForm = async (
  user: UserEvent,
  password: string,
  confirmPassword: string
) => {
  await changePasswordInput(user, password)
  await changeConfirmInput(user, confirmPassword)
}
