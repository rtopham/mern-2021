import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import { setAlert } from '../../redux/actions/alert'
import { register } from '../../redux/actions/users'

import {
  validateInputLength,
  validateEmail,
  validatePassword,
  validateConfirmPassword
} from '../../utils/formValidation'

import UserFormContainer from './UserFormContainer'
import UserForm from './UserForm'
import UserFormGroup from './UserFormGroup'

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { name, email, password, password2 } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()

    register({ name, email, password })
  }

  const validateForm = () => {
    return (
      validateInputLength(name, 2) === 'success' &&
      validateEmail(email) === 'success' &&
      validatePassword(password) === 'success' &&
      validateConfirmPassword(password, password2) === 'success'
    )
  }

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />
  }

  return (
    <UserFormContainer heading='Register'>
      <UserForm value='Register' onSubmit={onSubmit} disabled={!validateForm()}>
        <UserFormGroup
          label='Name'
          type='text'
          name='name'
          isValid={validateInputLength(name, 2) === 'success'}
          isInvalid={validateInputLength(name, 2) === 'error'}
          value={name}
          onChange={onChange}
          required
        />
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

        <p className='fst-italic'>
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
      <p></p>
      <p className='text-center'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </UserFormContainer>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.users.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register)
