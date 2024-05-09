import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ isAdminRoute }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth)

  return (
    loading === false &&
    (isAuthenticated ? (
      isAdminRoute && !user.isAdmin ? ( // Nếu đã đăng nhập và truy cập vào đường dẫn của admin mà user không phải admin thì trở về trang Home
        <Navigate to='/' />
      ) : (
        <Outlet />
      )
    ) : (
      <Navigate to='/login' /> // Nếu chưa đăng nhập mà truy cập thì sẽ chuyển đến trang đăng nhập
    ))
  )
}

export default ProtectedRoute
