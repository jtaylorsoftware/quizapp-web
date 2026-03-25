import React from 'react'
import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom'
import { render, screen } from 'util/test-utils'

import ConfirmModal from './ConfirmModal'

describe('ConfirmModal', () => {
  const cancelMock = jest.fn()
  const confirmMock = jest.fn()
  const props = {
    header: 'Confirm?',
    body: 'Are you sure?',
    cancelText: 'Cancel Action',
    confirmText: 'Confirm Action',
    onCancel: cancelMock,
    onConfirm: confirmMock,
    show: true,
  }

  beforeEach(() => {
    cancelMock.mockClear()
    confirmMock.mockClear()
  })

  it('renders without crashing', () => {
    render(<ConfirmModal {...props} />)
  })

  it('renders the given header and body', () => {
    render(<ConfirmModal {...props} />)
    expect(screen.queryByText(props.header)).not.toBeNull()
    expect(screen.queryByText(props.body)).not.toBeNull()
  })

  it('uses default button text if none given', () => {
    render(<ConfirmModal {...props} cancelText={''} confirmText={''} />)
    expect(screen.queryByText('Cancel')).not.toBeNull()
    expect(screen.queryByText('Confirm Changes')).not.toBeNull()
  })

  it('calls the button handlers when clicked', async () => {
    render(<ConfirmModal {...props} />)
    const user = userEvent.setup()
    const cancel = screen.getByText(props.cancelText)
    const confirm = screen.getByText(props.confirmText)
    await user.click(cancel)
    await user.click(confirm)
    expect(cancelMock).toHaveBeenCalled()
    expect(confirmMock).toHaveBeenCalled()
  })
})
