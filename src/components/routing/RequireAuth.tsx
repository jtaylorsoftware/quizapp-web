import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'

import Spinner from 'components/common/Spinner'
import { clearAuth } from 'store/auth/thunks'

import { tokenIsExpired } from 'util/jwt'
import { RootState } from 'store/store'

const mapState = (state: RootState) => ({
  auth: state.auth,
  user: state.user,
})

const mapDispatch = {
  clearAuth,
}

const connector = connect(mapState, mapDispatch)

type Props = ConnectedProps<typeof connector> & {
  redirectTo: string
}

const RequireAuth = function ({
  auth,
  user,
  clearAuth,
  redirectTo,
  children,
}: React.PropsWithChildren<Props>) {
  const location = useLocation()
  const shouldClearAuth = auth.token == null || tokenIsExpired(auth.token)

  useEffect(() => {
    if (shouldClearAuth && auth.isAuthenticated) {
      clearAuth()
    }
  }, [shouldClearAuth, auth.isAuthenticated, clearAuth])

  const isAuthenticated = auth.isAuthenticated && !shouldClearAuth
  const isUserLoading = user == null || user.loading
  const isAlreadyAtRedirect = location.pathname === redirectTo

  if (isAuthenticated) {
    if (isUserLoading) {
      return <Spinner />
    }

    return <>{children}</>
  }

  if (isAlreadyAtRedirect) {
    return null
  }

  return (
    <Navigate
      to={redirectTo}
      state={{ referrer: location.pathname }}
      replace
    />
  )
}

export default connector(RequireAuth)
