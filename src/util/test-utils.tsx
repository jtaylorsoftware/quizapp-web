import React from 'react'
import {
  render,
  RenderOptions,
  screen,
  fireEvent,
} from '@testing-library/react'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { RootState } from 'store/store'
import { MemoryRouter, Router } from 'react-router-dom'
import { createMemoryHistory, History } from 'history'

type MockStore = Partial<RootState>
const mockStore = configureStore<MockStore>([thunk])
const defaultMockStore = mockStore({})

interface AllContextsProps {
  children: React.ReactNode
  location: string | Partial<{ pathname: string; state?: { referrer: string } }>
  history: History
  store?: MockStore
}

const AllContextsWrapper = ({
  children,
  store,
  location,
  history,
}: AllContextsProps) => {
  return (
    <Provider store={store != null ? mockStore(store) : defaultMockStore}>
      <Router navigator={history} location={location}>
        {children}
      </Router>
    </Provider>
  )
}

const renderWithAllContexts = (
  ui: React.ReactElement<
    any,
    | string
    | ((
        props: any
      ) => React.ReactElement<
        any,
        string | any | (new (props: any) => React.Component<any, any, any>)
      > | null)
    | (new (props: any) => React.Component<any, any, any>)
  >,
  mockStore?: MockStore,
  history?: History,
  initialLocation?:
    | string
    | Partial<{ pathname: string; state?: { referrer: string } }>,
  options?: Pick<
    RenderOptions<typeof import('@testing-library/dom/types/queries')>,
    'container' | 'baseElement' | 'hydrate' | 'wrapper'
  >
) => {
  const Wrapper: React.FC<{}> = ({ children }) => (
    <AllContextsWrapper
      store={mockStore}
      history={history ?? createMemoryHistory()}
      location={initialLocation ?? '/'}>
      {children}
    </AllContextsWrapper>
  )
  return render(ui, {
    wrapper: Wrapper,
    ...options,
  })
}

const changeInput = (placeholder: string, value: string) => {
  const input = screen.getByPlaceholderText(placeholder)
  fireEvent.change(input, { target: { value } })
}

export * from '@testing-library/react'

export { renderWithAllContexts as render, mockStore, changeInput }
