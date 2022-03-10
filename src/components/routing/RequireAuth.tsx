import React from 'react'
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

const RequireAuth = function(
  {
    auth,
    user,
    clearAuth,
    redirectTo,
    children,
  }: React.PropsWithChildren<Props>) {
  const location = useLocation()
  let isAuthenticated = auth.isAuthenticated

  if (auth.token == null || tokenIsExpired(auth.token)) {
    clearAuth()
    isAuthenticated = false
  }

  if(isAuthenticated) {
    if (user.loading) {
      return <Spinner />
    } else {
      return <>{ children }</>
    }
  } else {
    return <Navigate to={redirectTo} state={{ referrer: location.pathname }} replace />
  }
}

export default connector(RequireAuth)
