import React from 'react'

import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from 'util/test-utils'
import clone from 'clone'

import { ResultListing } from 'api/models'
import { quizResults } from 'mocks/state'

import ResultItem from './ResultItem'

describe('ResultItem', () => {
  let result: ResultListing

  beforeEach(() => {
    result = clone(quizResults[0])
  })

  it('renders without crashing', () => {
    render(<ResultItem result={result} />)
  })

  it('renders the quiz title and creator', () => {
    render(<ResultItem result={result} />)
    expect(screen.queryByText(result.quizTitle)).not.toBeNull()
    expect(screen.queryByText(RegExp(`${result.ownerUsername}`))).not.toBeNull()
  })

  it('renders the quiz score as a percentage', () => {
    render(<ResultItem result={result} />)
    expect(
      screen.queryByText(RegExp(`${result.score * 100.0}%`))
    ).not.toBeNull()
  })

  it('redirects to the results page when clicking details button', () => {
    render(<ResultItem result={result} />)
    const detailBtn = screen.getByText(/details/i)
    act(() => {
      fireEvent.click(detailBtn)
    })
    expect(screen.getByTestId('router-location').textContent).toContain(
      `/results?quiz=${result.quiz}&user=${result.user}`
    )
  })
})
