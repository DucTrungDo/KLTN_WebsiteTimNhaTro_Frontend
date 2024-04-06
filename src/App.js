import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'

import './App.css'

// Home import
import MainHeader from './components/layout/Header'
import Footer from './components/layout/Footer'
import UserHeader from './components/layout/UserHeader'
import Home from './components/Home'

// Authentication
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import VerifyRegister from './components/auth/VerifyRegister'

import UserDashboard from './components/user/Dashboard'
import PostDetail from './components/post/PostDetail'

function App() {
  // const [showMainHeader, setShowMainHeader] = useState(false)
  return (
    <Router>
      <div className='bg-light'>
        <HeaderSwitcher />
        <main className='py-3'>
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/verify_register' element={<VerifyRegister />} />
              <Route path='/user/*' element={<UserRoutes />} />
              <Route path='/post_detail' element={<PostDetail />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

function HeaderSwitcher() {
  const location = useLocation()
  const isUserRoute = location.pathname.startsWith('/user')

  return <>{isUserRoute ? <UserHeader /> : <MainHeader />}</>
}

function UserRoutes() {
  return (
    <Routes>
      <Route path='dashboard' element={<UserDashboard />} />
      {/* Add more user routes here */}
    </Routes>
  )
}

export default App
