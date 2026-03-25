import React from 'react'
import userEvent, { type UserEvent } from '@testing-library/user-event'

import '@testing-library/jest-dom'
import {
  render,
  screen,
  waitFor,
  within,
} from 'util/test-utils'

import EmailForm from './EmailForm'

describe('EmailForm', () => {
  const mockChangeUserEmail = jest.fn(async (email: string) => {
    return null
  })

  const renderForm = () => {
    render(
      <EmailForm
        defaultValue={initialEmail}
        changeEmail={mockChangeUserEmail}
      />
    )
  }
  it('renders without crashing', () => {
    renderForm()
  })

  it('opens the form when the change button is clicked', async () => {
    const user = userEvent.setup()
    renderForm()
    expect(getEmailInput()).toBeNull()
    await openForm(user)
    expect(getEmailInput()).not.toBeNull()
  })

  it('closes the form when the cancel button is clicked', async () => {
    const user = userEvent.setup()
    renderForm()
    await openForm(user)
    await cancel(user)
    expect(getEmailInput()).toBeNull()
  })

  it('shows an error if submitting current email', async () => {
    const user = userEvent.setup()
    renderForm()
    await openForm(user)
    await changeEmailInput(user, initialEmail)
    await submit(user)
    expect(
      screen.queryByText(/You are already using this email/)
    ).toBeInTheDocument()
  })

  it('opens the confirmation modal if new email submitted', async () => {
    const user = userEvent.setup()
    renderForm()
    await openForm(user)
    await changeEmailInput(user, 'foo' + initialEmail)
    await submit(user)
    expect(screen.queryByTestId('confirm-modal')).toBeInTheDocument()
  })

  it('calls changeUserEmail when modal is confirmed', async () => {
    const user = userEvent.setup()
    renderForm()
    await openForm(user)
    await changeEmailInput(user, 'foo' + initialEmail)
    await submit(user)
    await confirm(user)
    await waitFor(() => expect(mockChangeUserEmail).toHaveBeenCalled())
  })
})

const initialEmail = 'user@email.com'

const openForm = async (user: UserEvent) => {
  await user.click(screen.getByText('Change Email'))
}

const getEmailInput = () => {
  return screen.queryByPlaceholderText('New email') as Element
}

const changeEmailInput = async (
  user: UserEvent,
  email: string
) => {
  const input = screen.getByPlaceholderText('New email')
  await user.clear(input)
  await user.type(input, email)
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
