import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Form } from 'react-bootstrap'

import { updateUser } from '../../redux/actions/users'

import { validateInputLength, validateEmail } from '../../utils/formValidation'

import EditSubmitCancel from './EditSubmitCancel'
import DashboardFormGroup from './DashboardFormGroup'

const EditProfile = ({ users: { user }, updateUser }) => {
  const initialState = {
    name: '',
    email: ''
  }

  const [formData, setFormData] = useState(initialState)
  const [edit, toggleEditState] = useState(false)

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email
    })
    //eslint-disable-next-line
  }, [])

  const { name, email } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    updateUser(formData)
    toggleEditState(false)
  }

  const toggleEdit = (e) => {
    toggleEditState(!edit)
  }

  return (
    <Form onSubmit={onSubmit}>
      <DashboardFormGroup
        controlId='name'
        label='Name'
        autoFocus
        isValid={validateInputLength(name, 2) === 'success'}
        isInvalid={validateInputLength(name, 2) === 'error'}
        name='name'
        type='name'
        value={name}
        disabled={!edit}
        onChange={onChange}
      />

      <DashboardFormGroup
        controlId='email'
        label='Email'
        isValid={validateEmail(email) === 'success'}
        isInvalid={validateEmail(email) === 'error'}
        name='email'
        type='email'
        value={email}
        disabled={!edit}
        onChange={onChange}
      />

      <EditSubmitCancel
        edit={edit}
        validated={
          validateInputLength(name, 2) === 'success' &&
          validateEmail(email) === 'success' &&
          (name !== user.name || email !== user.email)
        }
        toggleEdit={toggleEdit}
      />
    </Form>
  )
}

EditProfile.propTypes = {
  users: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  users: state.users
})

export default connect(mapStateToProps, { updateUser })(EditProfile)
