import React from 'react'
import { Card, Container } from 'react-bootstrap'

const NotFound = () => {
  return (
    <Container fluid className='userForms'>
      <Card border='dark' text='light' className='bg-dark text-center'>
        <Card.Header>MERN 2021</Card.Header>
        <Card.Body className='d-flex justify-content-center'>
          <Card.Text>
            <i className='fab fa-react fa-9x' style={{ color: '#61DBFB' }} />
          </Card.Text>
        </Card.Body>
        <Card.Footer>Landing Page</Card.Footer>
      </Card>
    </Container>
  )
}

export default NotFound
