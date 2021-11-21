import React from 'react'

import Form from 'react-bootstrap/Form'

const DashboardFormGroup = ({
  controlId,
  label,
  type,
  name,
  isValid,
  isInvalid,
  value,
  onChange,
  required,
  disabled
}) => {
  return (
    <Form.Group className='mb-3'>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        controlId={controlId}
        type={type}
        name={name}
        isValid={isValid}
        isInvalid={isInvalid}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
    </Form.Group>
  )
}

export default DashboardFormGroup
