import React from 'react'

import { Form } from 'react-bootstrap'

import BlockSubmitBtn from '../layout/BlockSubmitBtn'

const UserForm = ({ children, onSubmit, value, disabled }) => {
  return (
    <>
      <Form onSubmit={onSubmit}>
        {children}
        <BlockSubmitBtn value={value} disabled={disabled} />
      </Form>
    </>
  )
}

export default UserForm
