import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Landing from '../layout/Landing'
import Dashboard from '../dashboard/Dashboard'
import NotFound from '../layout/NotFound'
import Login from '../users/Login'
import Register from '../users/Register'
import PasswordResetRequest from '../users/PasswordResetRequest'
import ResetPassword from '../users/ResetPassword'
import RequireAuth from './RequireAuth'

const ClientRoutes = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Landing />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/register' element={<Register />} />
      <Route
        exact
        path='/dashboard'
        element={
          <RequireAuth redirectTo='/login'>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        exact
        path='/password-reset-request'
        element={<PasswordResetRequest />}
      />
      <Route exact path='/reset-password/:token' element={<ResetPassword />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default ClientRoutes
