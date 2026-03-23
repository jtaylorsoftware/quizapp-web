import React from 'react'

import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from 'util/test-utils'

import clone from 'clone'
import { result } from 'mocks/state'

import ResultItem from './ResultItem'
import { Result } from 'api/models'

describe('ResultItem', () => {
  let mockResult: Result
  beforeEach(() => {
    mockResult = clone(result)
  })
  it('renders the result headline with the username', () => {
    render(<ResultItem result={{ ...mockResult }} />)
    expect(screen.queryByText(`Results for ${mockResult.username}`))
  })
  it('renders the result score as a percentage', () => {
    render(<ResultItem result={{ ...mockResult }} />)
    expect(screen.queryByText(`Results for ${mockResult.score * 100.0}%`))
  })
  it('redirects to the result page when clicking the details button', () => {
    render(<ResultItem result={{ ...mockResult }} />)
    const detailsBtn = screen.getByText('Details')
    act(() => {
      fireEvent.click(detailsBtn)
    })
    expect(screen.getByTestId('router-location').textContent).toContain(
      `/results?quiz=${mockResult.quiz}&user=${mockResult.user}`
    )
  })
})
