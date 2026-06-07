import React, { useCallback } from 'react'
import { Row, Col } from 'react-bootstrap'

import {
  deleteUser,
  changeUserEmail,
  changeUserPassword,
} from 'store/user/thunks'
import { dateToLongLocaleString } from 'util/date'
import { useAppDispatch, useAppSelector } from 'hooks'

import PasswordForm from './PasswordForm'
import EmailForm from './EmailForm'
import DeleteButton from './DeleteButton'

/**
 * Displays the User's info to a dashboard block. Allows editing of password and email
 * through child components.
 */
const UserInfo = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user.user)
  const { username, email, date } = user!
  const dateString = dateToLongLocaleString(date)
  const changeEmail = useCallback(
    (email: string) => dispatch(changeUserEmail(email)),
    [dispatch]
  )
  const changePassword = useCallback(
    (password: string) => dispatch(changeUserPassword(password)),
    [dispatch]
  )
  return (
    <>
      <Row>
        <Col>
          <h1>
            Hello, <span>{username}</span>
          </h1>
        </Col>
      </Row>
      <Row className='mb-1'>
        <Col>
          <h4 className='mb-0'>
            Email: <span>{email}</span>
          </h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>
            Joined: <span>{dateString}</span>
          </h4>
        </Col>
      </Row>

      <EmailForm defaultValue={email} changeEmail={changeEmail} />
      <PasswordForm changePassword={changePassword} />
      <Row className='my-2'>
        <Col>
          <DeleteButton
            text='Delete Account'
            onClick={() => dispatch(deleteUser())}
            confirm={true}
            modalConfig={{
              header: 'Confirm Account Deletion',
              body: 'Are you sure you want to delete your account? This action is irreversible!',
              confirmText: 'Yes, delete my account.',
            }}
          />
        </Col>
      </Row>
    </>
  )
}

export default UserInfo
