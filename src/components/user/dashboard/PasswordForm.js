import React from 'react'
import PropTypes from 'prop-types'

import { useFormData } from '../../util/useFormData'

/**
 * Displays and controls a form for the user to change their password.
 */
const PasswordForm = ({ isOpen, submitChanges }) => {
  if (!isOpen) {
    return null
  }

  const [formData, handleChange] = useFormData({
    password: '',
    confirmPassword: ''
  })

  const { password, confirmPassword } = formData

  const onSubmit = e => {
    e.preventDefault()
    if (password === confirmPassword) {
      submitChanges({ password })
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className='row'>
        <div className='col'>
          <div className='row my-2'>
            <div className='col'>
              <input
                className=' form-control'
                type='password'
                placeholder='New password'
                name='password'
                value={password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='row my-2'>
            <div className='col'>
              <input
                className=' form-control'
                type='password'
                placeholder='Confirm new password'
                name='confirmPassword'
                value={confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='row my-2'>
            <div className='col'>
              <button className='btn btn-danger btn-sm'>Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

PasswordForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  submitChanges: PropTypes.func.isRequired
}

export default PasswordForm
