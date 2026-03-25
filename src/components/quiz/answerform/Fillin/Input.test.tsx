import React from 'react'
import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom'

import Input from './Input'
import { render, screen } from 'util/test-utils'

describe('Input', () => {
  it('renders without crashing', () => {
    render(<Input questionIndex={0} onChange={() => {}} />)
  })

  it('can input some answer text and screen matches input', async () => {
    let text = ''
    const user = userEvent.setup()
    const onChange = (value: string) => {
      text = value
    }
    const changedValue = 'my input'
    render(<Input questionIndex={0} onChange={onChange} />)
    await user.type(screen.getByPlaceholderText('Answer text...'), changedValue)
    expect(text).toEqual(changedValue)
  })
})
