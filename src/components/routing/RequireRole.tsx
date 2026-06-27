import React from 'react'

import Spinner from 'components/common/Spinner'
import ErrorPage from 'components/errors/ErrorPage'

import { useAppSelector } from 'hooks'
import { UserRole } from 'api/models'

type Props = {
  allowedRoles: UserRole[]
}

const RequireRole = ({
  allowedRoles,
  children,
}: React.PropsWithChildren<Props>) => {
  const { auth, user } = useAppSelector((state) => ({
    auth: state.auth,
    user: state.user,
  }))

  if (!auth.isAuthenticated) {
    return null
  }

  if (user == null || user.loading || user.user == null) {
    return <Spinner />
  }

  if (!allowedRoles.includes(user.user.role)) {
    return <ErrorPage status={403} />
  }

  return <>{children}</>
}

export default RequireRole
