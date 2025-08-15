import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks'

function AuthRoute({ element }) {
  const { isAuth } = useAuth()
  if (!isAuth) return <Navigate to="/" />
  return element
}

export default AuthRoute
