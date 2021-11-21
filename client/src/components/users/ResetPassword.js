import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, Navigate, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

import { setAlert } from '../../redux/actions/alert'
import { resetUserPassword, checkResetToken } from '../../redux/actions/users'

import {
  validatePassword,
  validateConfirmPassword
} from '../../utils/formValidation'

import UserFormContainer from './UserFormContainer'
import UserForm from './UserForm'
import UserFormGroup from './UserFormGroup'

const ResetPassword = ({
  users: { isAuthenticated, validResetToken },
  setAlert,
  resetUserPassword,
  checkResetToken
}) => {
  const { token } = useParams()
  useEffect(() => {
    checkResetToken(token)
  }, [token, checkResetToken, validResetToken])

  const [formData, setFormData] = useState({
    password: '',
    password2: ''
  })

  const { password, password2 } = formData

  const [redirectToLogin, setRedirectToLogin] = useState(false)

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger')
    } else {
      resetUserPassword(token, formData.password)
      setRedirectToLogin(true)
    }
  }

  const validateForm = () => {
    return (
      validatePassword(password) === 'success' &&
      validateConfirmPassword(password, password2) === 'success'
    )
  }

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />
  }

  if (redirectToLogin) {
    return <Navigate to='/login' />
  }

  if (!validResetToken)
    return (
      <UserFormContainer heading='Reset Password'>
        <p className='text-center'>The reset token is not valid.</p>
        <p className='text-center'>
          <Link to='/password-reset-request'>
            Request a new password reset email?
          </Link>
        </p>
      </UserFormContainer>
    )

  return (
    <UserFormContainer heading='Reset Password'>
      <UserForm
        onSubmit={onSubmit}
        value='Reset Password'
        disabled={!validateForm()}
      >
        <UserFormGroup
          label='Password'
          type='password'
          name='password'
          value={password}
          isValid={validatePassword(password) === 'success'}
          isInvalid={validatePassword(password) === 'error'}
          onChange={onChange}
          required
          minLength='6'
        />
        <p className='font-italic'>
          Password must contain at least eight characters, one uppercase letter,
          one lowercase letter and one number. Special characters are allowed.
        </p>

        <UserFormGroup
          label='Confirm Password'
          type='password'
          name='password2'
          value={password2}
          isValid={validateConfirmPassword(password, password2) === 'success'}
          isInvalid={validateConfirmPassword(password, password2) === 'error'}
          onChange={onChange}
          required
        />
      </UserForm>
    </UserFormContainer>
  )
}

ResetPassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  resetUserPassword: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  checkResetToken: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  users: state.users
})

export default connect(mapStateToProps, {
  setAlert,
  resetUserPassword,
  checkResetToken
})(ResetPassword)
