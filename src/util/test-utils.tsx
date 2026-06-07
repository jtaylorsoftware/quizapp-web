import React from 'react'
import {
  render,
  RenderOptions,
} from '@testing-library/react'

import { Provider } from 'react-redux'
import { AppStore, RootState, createAppStore } from 'store/store'
import { MemoryRouter, useLocation } from 'react-router-dom'

type RouterLocation =
  | string
  | Partial<{
      pathname: string
      search: string
      hash: string
      state: { referrer: string }
    }>

interface AllContextsProps {
  children: React.ReactNode
  location?: RouterLocation
  store: AppStore
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
    <Provider store={store}>
      <MemoryRouter
        initialEntries={[location ?? '/']}
        >
        {children}
        <RouterLocationProbe />
      </MemoryRouter>
    </Provider>
  )
}

interface CustomRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
  location?: RouterLocation
}

const normalizePreloadedState = (
  preloadedState?: Partial<RootState>
): Partial<RootState> => {
  if (preloadedState == null) {
    return {}
  }

  const normalized: Partial<RootState> = {}

  if (preloadedState.alerts !== undefined) {
    normalized.alerts = preloadedState.alerts
  }

  if (preloadedState.auth !== undefined) {
    normalized.auth = preloadedState.auth
  }

  if (preloadedState.user !== undefined) {
    normalized.user = preloadedState.user
  }

  return normalized
}

const renderWithAllContexts = (
  ui: React.ReactNode,
  preloadedState: Partial<RootState> = {},
  initialLocation: RouterLocation = '/',
  {
    store = createAppStore(normalizePreloadedState(preloadedState)),
    ...renderOptions
  }: CustomRenderOptions = {}
) => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <AllContextsWrapper store={store} location={initialLocation}>
      {children}
    </AllContextsWrapper>
  )

  return render(ui, {
    wrapper: Wrapper,
    ...renderOptions,
  })
}

export * from '@testing-library/react'

export { renderWithAllContexts as render }
