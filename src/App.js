import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css'

// Home import
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/Home'
import Login from './components/user/Login'
import Register from './components/user/Register'

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
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
