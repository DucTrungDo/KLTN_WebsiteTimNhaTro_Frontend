import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ isAdminRoute, isModeratorRoute }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth)

  return (
    loading === false &&
    (isAuthenticated ? (
      isAdminRoute ? (
        user.isAdmin ? (
          <Outlet />
        ) : user.isModerator ? (
          <Navigate to='/moderator/dashboard' />
        ) : (
          <Navigate to='/' />
        )
      ) : isModeratorRoute ? (
        user.isModerator || user.isAdmin ? (
          <Outlet />
        ) : (
          <Navigate to='/' />
        )
      ) : (
        <Outlet />
      )
    ) : (
      <Navigate to='/login' />
    ))
  )
}

export default ProtectedRoute
