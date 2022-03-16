import React from 'react'

import '@testing-library/jest-dom'

import Input from './Input'
import { render, screen } from 'util/test-utils'
import { fireEvent } from '@testing-library/react'

describe('Input', () => {
  it('renders without crashing', () => {
    render(<Input questionIndex={0} onChange={() => {
    }} />)
  })

  it('can input some answer text and screen matches input', () => {
    let text = ''
    const onChange = (value: string) => {
      text = value
    }
    const changedValue = 'my input'
    render(<Input questionIndex={0} onChange={onChange} />)
    fireEvent.change(
      screen.getByPlaceholderText('Answer text...'),
      { target: { value: changedValue } })
    expect(text).toEqual(changedValue)
  })
})