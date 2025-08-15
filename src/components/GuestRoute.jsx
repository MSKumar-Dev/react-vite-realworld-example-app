import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks'

function GuestRoute({ element }) {
  const { isAuth } = useAuth()
  if (isAuth) return <Navigate to="/" />
  return element
}

export default GuestRoute
