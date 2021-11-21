import React from 'react'

const BlockSubmitBtn = ({ value, disabled }) => {
  return (
    <div className='mt-4 d-grid gap-2'>
      <input
        type='submit'
        value={value}
        disabled={disabled}
        className='btn btn-dark'
      />
    </div>
  )
}

export default BlockSubmitBtn
