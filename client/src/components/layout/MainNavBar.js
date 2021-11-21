import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Image, Container } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { logout } from '../../redux/actions/users'

const MainNavbar = ({ title, users: { isAuthenticated, user }, logout }) => {
  const onLogout = () => {
    logout()
  }

  const authLinks = (
    <Fragment>
      <Navbar.Text>{user && 'Hello, ' + user.name} </Navbar.Text>
      <Nav>
        <Nav.Item>
          <Nav.Link as={Link} to='/dashboard'>
            Dashboard
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to='/login' onClick={onLogout}>
            <i className='fa fa-sign-out-alt'></i> Logout
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Fragment>
  )

  let guestLinks = (
    <Fragment>
      <Nav>
        <Nav.Item>
          <Nav.Link as={Link} to='/register'>
            Register
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link as={Link} to='/login'>
            Login
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Fragment>
  )

  return (
    <div>
      <Navbar expand='lg' variant='dark' bg='dark' fixed='top'>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            <Image className='brandImage' src='/favicon.ico' /> {title}
          </Navbar.Brand>
          {isAuthenticated ? authLinks : guestLinks}
        </Container>
      </Navbar>
    </div>
  )
}

MainNavbar.propTypes = {
  title: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
}

MainNavbar.defaultProps = {
  title: 'MERN 2021',
  isAuthenticated: false
}

const mapStateToProps = (state) => ({
  users: state.users
})

export default connect(mapStateToProps, { logout })(MainNavbar)
