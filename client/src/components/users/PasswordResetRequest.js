import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { requestPasswordReset } from '../../redux/actions/users'

import { validateEmail } from '../../utils/formValidation'
import PropTypes from 'prop-types'

import UserFormContainer from './UserFormContainer'
import UserForm from './UserForm'
import UserFormGroup from './UserFormGroup'

const PasswordResetRequest = ({ requestPasswordReset, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: ''
  })

  const { email } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    requestPasswordReset(email)
    setFormData({ ...formData, email: '' })
  }

  const validateForm = () => {
    return validateEmail(email) === 'success'
  }

  //Redirect if logged in

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />
  }

  return (
    <UserFormContainer heading='Reset Password'>
      <UserForm
        onSubmit={onSubmit}
        value='Send Email'
        disabled={!validateForm()}
      >
        <p>
          Enter the email address associated with your account to receive a
          password reset email.
        </p>
        <UserFormGroup
          label='Email Address'
          type='email'
          name='email'
          value={email}
          isValid={validateEmail(email) === 'success'}
          isInvalid={validateEmail(email) === 'error'}
          onChange={onChange}
          required
          minLength='6'
        />
      </UserForm>
      <p></p>

      <p className='text-center'>
        <Link to='/login'>Cancel</Link>
      </p>
    </UserFormContainer>
  )
}

PasswordResetRequest.propTypes = {
  requestPasswordReset: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.users.isAuthenticated
})

export default connect(mapStateToProps, { requestPasswordReset })(
  PasswordResetRequest
)
