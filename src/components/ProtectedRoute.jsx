import React from 'react'
import { Navigate } from 'react-router-dom'
import { LoggedContext } from '../contexts/LoggedContext'

export const ProtectedRoute = ({ children }) => {
  const loggedIn = React.useContext(LoggedContext)
  return loggedIn ? children : <Navigate to="/sign-in" />
}
