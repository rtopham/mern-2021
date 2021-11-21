import React, { useState } from 'react'

import { Button } from 'react-bootstrap'

import DeleteAccountModal from './DeleteAccountModal'

const DeleteAccount = () => {
  const [showModal, setShowModal] = useState(false)

  const clickDelete = () => {
    setShowModal(true)
  }

  return (
    <>
      <p>
        You may delete your account at any time. If you delete your account,
        your account profile and all of your stored data will be deleted
        permanently and you will no longer be able to access your account.
      </p>
      <div className='mt-3'>
        <Button variant='primary' onClick={clickDelete}>
          Delete Account
        </Button>
      </div>
      <DeleteAccountModal show={showModal} setShowModal={setShowModal} />
    </>
  )
}

export default DeleteAccount
