import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Form } from 'react-bootstrap'

import { updateUser } from '../../redux/actions/users'

import {
  validatePassword,
  validateConfirmPassword
} from '../../utils/formValidation'

import EditSubmitCancel from './EditSubmitCancel'
import DashboardFormGroup from './DashboardFormGroup'

const EditPassword = ({ users: { user }, updateUser }) => {
  const initialState = {
    password: '',
    password2: ''
  }

  const [formData, setFormData] = useState(initialState)
  const [edit, toggleEditState] = useState(false)

  const { password, password2 } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    updateUser({
      name: user.name,
      email: user.email,
      password: formData.password
    })
    toggleEditState(false)
    setFormData({ password: '', password2: '' })
  }

  const toggleEdit = (e) => {
    toggleEditState(!edit)
  }

  return (
    <Form onSubmit={onSubmit}>
      <DashboardFormGroup
        controlId='password'
        label='New Password'
        autoFocus
        isValid={validatePassword(password) === 'success'}
        isInvalid={validatePassword(password) === 'error'}
        name='password'
        type='password'
        value={password}
        disabled={!edit}
        onChange={onChange}
      />

      <DashboardFormGroup
        controlId='password2'
        label='Confirm New Password'
        isValid={validateConfirmPassword(password, password2) === 'success'}
        isInvalid={validateConfirmPassword(password, password2) === 'error'}
        name='password2'
        type='password'
        value={password2}
        disabled={!edit}
        onChange={onChange}
      />

      <EditSubmitCancel
        edit={edit}
        validated={
          validatePassword(password) === 'success' &&
          validateConfirmPassword(password, password2) === 'success'
        }
        toggleEdit={toggleEdit}
      />
    </Form>
  )
}

EditPassword.propTypes = {
  users: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  users: state.users
})

export default connect(mapStateToProps, { updateUser })(EditPassword)
