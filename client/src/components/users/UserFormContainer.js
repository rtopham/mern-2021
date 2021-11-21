import React from 'react'

import { Card, Container } from 'react-bootstrap'

const UserFormContainer = ({ children, heading }) => {
  return (
    <Container fluid className='authForms'>
      <Card border='dark' text='dark'>
        <Card.Header>
          <h1>
            <span>
              <i className='fas fa-user' /> {heading}
            </span>
          </h1>
        </Card.Header>
        <Card.Body>{children}</Card.Body>
      </Card>
    </Container>
  )
}

export default UserFormContainer
