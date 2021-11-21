import React from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'

const RequireAuth = ({ children, redirectTo, users: { isAuthenticated } }) => {
  return isAuthenticated ? children : <Navigate to={redirectTo} />
}

const mapStateToProps = (state) => ({
  users: state.users
})

export default connect(mapStateToProps)(RequireAuth)
