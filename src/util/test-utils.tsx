import React from 'react'
import {
  render,
  RenderOptions,
} from '@testing-library/react'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { RootState } from 'store/store'
import { MemoryRouter, useLocation } from 'react-router-dom'

type MockStore = Partial<RootState>
const mockStore = configureStore<MockStore>([thunk])
const defaultMockStore = mockStore({})

interface AllContextsProps {
  children: React.ReactNode
  location?:
    | string
    | Partial<{
        pathname: string
        search: string
        hash: string
        state: { referrer: string }
      }>
  store?: MockStore
}

const RouterLocationProbe = () => {
  const location = useLocation()
  return (
    <div data-testid='router-location'>
      {`${location.pathname}${location.search}`}
    </div>
  )
}

const AllContextsWrapper = ({
  children,
  store,
  location,
}: AllContextsProps) => {
  return (
    <Provider store={store != null ? mockStore(store) : defaultMockStore}>
      <MemoryRouter
        initialEntries={[location ?? '/']}
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}>
        {children}
        <RouterLocationProbe />
      </MemoryRouter>
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
  initialLocation?:
    | string
    | Partial<{
        pathname: string
        search: string
        hash: string
        state?: { referrer: string }
      }>,
  options?: Pick<
    RenderOptions,
    'container' | 'baseElement' | 'hydrate' | 'wrapper'
  >
) => {
  const Wrapper: React.FC<{}> = ({ children }) => (
    <AllContextsWrapper store={mockStore} location={initialLocation ?? '/'}>
      {children}
    </AllContextsWrapper>
  )
  return render(ui, {
    wrapper: Wrapper,
    ...options,
  })
}

export * from '@testing-library/react'

export { renderWithAllContexts as render, mockStore }
