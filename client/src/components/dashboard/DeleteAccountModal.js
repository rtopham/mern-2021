import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  Modal,
  Button,
  Form,
  FormGroup,
  FormLabel,
  FormControl
} from 'react-bootstrap'
import { deleteAccount } from '../../redux/actions/users'
import { validateConfirmationText } from '../../utils/formValidation'
import PropTypes from 'prop-types'

const DeleteAccountModal = ({ show, setShowModal, deleteAccount }) => {
  const [formData, setFormData] = useState({ formText: '' })

  const { formText } = formData

  const confirmationText = 'permanently delete account'

  const clickDelete = () => {
    deleteAccount()
  }

  const clickCancel = () => {
    setFormData({ formText: '' })

    setShowModal(false)
  }

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  return (
    <Modal centered show={show}>
      <Modal.Header>
        <Modal.Title>Permanently Delete Account?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {' '}
        <i className='fa fa-exclamation-triangle'></i> This action cannot be
        undone. Your profile and all of your stored data will be deleted
        permanently and you will no longer be able to access your account.{' '}
        <Form className='mt-3'>
          <FormGroup controlId='formText'>
            <FormLabel>
              To confirm deletion, type{' '}
              <i>
                <b>{confirmationText}</b>
              </i>{' '}
              below.
            </FormLabel>
            <FormControl
              autoFocus
              isValid={
                validateConfirmationText(formText, confirmationText) ===
                'success'
              }
              name='formText'
              value={formText}
              placeholder={confirmationText}
              onChange={onChange}
            />
          </FormGroup>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          disabled={
            validateConfirmationText(formText, confirmationText) !== 'success'
          }
          onClick={clickDelete}
        >
          Delete Account
        </Button>{' '}
        <Button variant='secondary' onClick={clickCancel}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

DeleteAccountModal.propTypes = {
  users: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  users: state.users
})

export default connect(mapStateToProps, {
  deleteAccount
})(DeleteAccountModal)
