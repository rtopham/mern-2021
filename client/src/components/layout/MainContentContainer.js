import React from 'react'
import { Container } from 'react-bootstrap'

const MainContentContainer = ({ children }) => {
  return (
    <main>
      <Container>{children}</Container>
    </main>
  )
}

export default MainContentContainer
