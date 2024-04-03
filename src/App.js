import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css'

// Home import
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/Home'

// Authentication
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import VerifyRegister from './components/auth/VerifyRegister'

import UserDashboard from './components/user/Dashboard'
import PostDetail from './components/post/PostDetail'

function App() {
  return (
    <Router>
      <div className='bg-light'>
        <Header />
        <main className='py-3'>
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/verify_register' element={<VerifyRegister />} />
              <Route path='/user/dashboard' element={<UserDashboard />} />

              <Route path='/post_detail' element={<PostDetail />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
