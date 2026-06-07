import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import Spinner from 'components/common/Spinner'
import { clearAuth } from 'store/auth/thunks'

import { tokenIsExpired } from 'util/jwt'
import { useAppDispatch, useAppSelector } from 'hooks'

type Props = {
  redirectTo: string
}

const RequireAuth = function ({
  redirectTo,
  children,
}: React.PropsWithChildren<Props>) {
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.auth)
  const user = useAppSelector((state) => state.user)
  const location = useLocation()
  const shouldClearAuth = auth.token == null || tokenIsExpired(auth.token)

  useEffect(() => {
    if (shouldClearAuth && auth.isAuthenticated) {
      dispatch(clearAuth())
    }
  }, [shouldClearAuth, auth.isAuthenticated, dispatch])

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

export default RequireAuth
