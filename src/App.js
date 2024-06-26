import React, { useEffect, useState } from 'react'
import store from './store'
import { loadUser } from './actions/userActions'
import Cookies from 'js-cookie'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { useSelector } from 'react-redux'

import './App.css'

// Layout import
import MainHeader from './components/layout/Header'
import MainFooter from './components/layout/Footer'
import UserHeader from './components/layout/UserHeader'
import UserSidebar from './components/layout/UserSidebar'
import AdminHeader from './components/layout/AdminHeader'
import AdminSidebar from './components/layout/AdminSidebar'
import ModeratorHeader from './components/layout/ModeratorHeader'
import ModeratorSidebar from './components/layout/ModeratorSidebar'

// Home import
import Home from './components/Home'

// Auth import
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ResendOtp from './components/auth/ResendOtp'
import VerifyRegister from './components/auth/VerifyRegister'
import ForgotPassword from './components/auth/ForgotPassWord'

// User import
import UserDashboard from './components/user/Dashboard'
import PostManagement from './components/user/PostManagement'
import Profile from './components/user/Profile'
import Recharge from './components/user/Recharge'
import RechargeHistory from './components/user/RechargeHistory'
import PaymentHistory from './components/user/PaymentHistory'
import ServicePriceList from './components/user/ServicePriceList'
import ChangePassword from './components/user/ChangePassword'

// Admin import
import AdminDashboard from './components/admin/Dashboard'
import AdminPostManagement from './components/admin/PostManagement'
import AdminUserManagement from './components/admin/UserManagement'
import AdminCategoryManagement from './components/admin/CategoryManagement'
import AdminInvoiceManagement from './components/admin/InvoiceManagement'

// Moderator import
import ModeratorDashboard from './components/moderator/Dashboard'
import PostModeration from './components/moderator/PostModeration'

// Post import
import AddNewPost from './components/post/Addnewpost'
import PostDetail from './components/post/PostDetail'
import EditPost from './components/post/EditPost'
import FavoritePost from './components/post/FavoritePost'
import SuccessfulPayment from './components/post/SuccessfulPayment'

import ProtectedRoute from './components/route/ProtectedRoute'

function App() {
  const token = Cookies.get('accessToken')
  useEffect(() => {
    store.dispatch(loadUser(token))
  })
  return (
    <Router>
      <div className='bg-light'>
        <HeaderSwitcher />
        <main>
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/resend-otp' element={<ResendOtp />} />
              <Route
                path='/verify_register/:email'
                element={<VerifyRegister />}
              />
              <Route path='/post/:slug' element={<PostDetail />} />
              <Route path='/post/:slug/me' element={<PostDetail />} />
              <Route path='/post/:slug/moderator' element={<PostDetail />} />
              <Route path='/post/:slug/admin' element={<PostDetail />} />
              <Route path='/forgot_password' element={<ForgotPassword />} />
              <Route path='/favorite_post' element={<FavoritePost />} />
            </Routes>
          </div>
        </main>
        <FooterSwitcher />
      </div>
      <div>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path='/user/*' element={<UserRoutes />} />
          </Route>
        </Routes>
      </div>
      <div>
        <Routes>
          <Route element={<ProtectedRoute isAdminRoute={true} />}>
            <Route path='/admin/*' element={<AdminRoutes />} />
          </Route>
        </Routes>
      </div>
      <div>
        <Routes>
          <Route element={<ProtectedRoute isModeratorRoute={true} />}>
            <Route path='/moderator/*' element={<ModeratorRoutes />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

function HeaderSwitcher() {
  const location = useLocation()
  const isUserRoute = location.pathname.startsWith('/user')
  const isAdminRoute = location.pathname.startsWith('/admin')
  const isModeratorRoute = location.pathname.startsWith('/moderator')
  const { loading, isAuthenticated, user } = useSelector((state) => state.auth)

  return (
    <>
      {loading &&
      (isUserRoute || isAdminRoute || isModeratorRoute) ? null : isUserRoute &&
        isAuthenticated ? (
        <UserHeader />
      ) : isAdminRoute && isAuthenticated && user.isAdmin ? (
        <AdminHeader />
      ) : isModeratorRoute && isAuthenticated && user.isModerator ? (
        <ModeratorHeader />
      ) : (
        <MainHeader />
      )}
    </>
  )
}

function FooterSwitcher() {
  const location = useLocation()
  const isUserRoute = location.pathname.startsWith('/user')
  const isAdminRoute = location.pathname.startsWith('/admin')
  const isModeratorRoute = location.pathname.startsWith('/moderator')

  return (
    <>
      {isUserRoute || isAdminRoute || isModeratorRoute ? null : <MainFooter />}
    </>
  )
}

function UserRoutes() {
  return (
    <div className='container-fluid'>
      <div className='row vh-100'>
        <UserSidebar />
        <main className='ml-sm-auto col-lg-10 user-main'>
          <Routes>
            <Route path='dashboard' element={<UserDashboard />} />
            <Route path='post-management' element={<PostManagement />} />
            <Route path='post/edit/:slug' element={<EditPost />} />
            <Route path='profile' element={<Profile />} />
            <Route path='recharge' element={<Recharge />} />
            <Route path='recharge-history' element={<RechargeHistory />} />
            <Route path='payment-history' element={<PaymentHistory />} />
            <Route path='service-price-list' element={<ServicePriceList />} />
            <Route path='change-password' element={<ChangePassword />} />
            <Route path='add-new-post' element={<AddNewPost />} />
            <Route path='payment-success' element={<SuccessfulPayment />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function AdminRoutes() {
  return (
    <div className='container-fluid'>
      <div className='row vh-100'>
        <AdminSidebar />
        <main className='ml-sm-auto col-lg-10 user-main'>
          <Routes>
            <Route path='dashboard' element={<AdminDashboard />} />
            <Route path='post-management' element={<AdminPostManagement />} />
            <Route path='user-management' element={<AdminUserManagement />} />
            <Route
              path='category-management'
              element={<AdminCategoryManagement />}
            />
            <Route
              path='invoice-management'
              element={<AdminInvoiceManagement />}
            />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function ModeratorRoutes() {
  return (
    <div className='container-fluid'>
      <div className='row vh-100'>
        <ModeratorSidebar />
        <main className='ml-sm-auto col-lg-10 user-main'>
          <Routes>
            <Route path='dashboard' element={<ModeratorDashboard />} />
            <Route path='post-moderation' element={<PostModeration />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
