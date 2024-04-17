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

import './App.css'

// Home import
import MainHeader from './components/layout/Header'
import MainFooter from './components/layout/Footer'
import UserHeader from './components/layout/UserHeader'
import UserSidebar from './components/layout/UserSidebar'
import Home from './components/Home'

// Authentication
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import VerifyRegister from './components/auth/VerifyRegister'
import ForgotPassword from './components/auth/ForgotPassWord'
// User management page
import UserDashboard from './components/user/Dashboard'
import PostManagement from './components/user/PostManagement'
import Profile from './components/user/Profile'
import Recharge from './components/user/Recharge'
import RechargeHistory from './components/user/RechargeHistory'
import PaymentHistory from './components/user/PaymentHistory'
import ServicePriceList from './components/user/ServicePriceList'
import AddNewPost from './components/user/Addnewpost'
import PostDetail from './components/post/PostDetail'

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
              <Route path='/verify_register' element={<VerifyRegister />} />
              <Route path='/post_detail' element={<PostDetail />} />
              <Route path='/forgot_password' element={<ForgotPassword />} />
            </Routes>
          </div>
        </main>
        <FooterSwitcher />
      </div>
      <div>
        <Routes>
          <Route path='/user/*' element={<UserRoutes />} />
        </Routes>
      </div>
    </Router>
  )
}

function HeaderSwitcher() {
  const location = useLocation()
  const isUserRoute = location.pathname.startsWith('/user')

  return <>{isUserRoute ? <UserHeader /> : <MainHeader />}</>
}

function FooterSwitcher() {
  const location = useLocation()
  const isUserRoute = location.pathname.startsWith('/user')

  return <>{isUserRoute ? <HiddenFooter /> : <MainFooter />}</>
}

function HiddenFooter() {
  return null // Trả về null để ẩn footer
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
            <Route path='profile' element={<Profile />} />
            <Route path='recharge' element={<Recharge />} />
            <Route path='recharge-history' element={<RechargeHistory />} />
            <Route path='payment-history' element={<PaymentHistory />} />
            <Route path='service-price-list' element={<ServicePriceList />} />
            <Route path='/add-new-post' element={<AddNewPost />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
