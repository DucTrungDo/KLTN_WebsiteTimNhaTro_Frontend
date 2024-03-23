import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import './App.css'

// Home import
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/Home'

function App() {
  return (
    <Router>
      <Fragment>
        <Header />
        <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/' element={<Home />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </Fragment>
    </Router>
  )
}

export default App
