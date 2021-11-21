import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import { login } from '../../redux/actions/users'

import { validateEmail, validatePassword } from '../../utils/formValidation'

import UserFormContainer from './UserFormContainer'
import UserForm from './UserForm'
import UserFormGroup from './UserFormGroup'

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  const validateForm = () => {
    return (
      validateEmail(email) === 'success' &&
      validatePassword(password) === 'success'
    )
  }

  //Redirect if logged in

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />
  }

  return (
    <UserFormContainer heading='Sign In'>
      <UserForm value='Login' onSubmit={onSubmit} disabled={!validateForm()}>
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
      </UserForm>
      <p></p>
      <p className='text-center'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
      <p className='text-center'>
        <Link to='/password-reset-request'>Forgot password?</Link>
      </p>
    </UserFormContainer>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.users.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
