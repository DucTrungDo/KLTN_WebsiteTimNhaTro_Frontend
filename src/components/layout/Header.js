import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Header = () => {
  return (
    <header>
      <Navbar>
        <Container>
          <a href='/'>
            <img src='./images/logo.png' alt='' className='header-image' />
          </a>
          <div className='collapse navbar-collapse' id='navbarCollapse'>
            <div className='navbar-nav ms-auto py-0'>
              <a href='index.html' className='nav-item nav-link'>
                Yêu thích
              </a>
              <a href='about.html' className='nav-item nav-link mx-3'>
                Đăng nhập
              </a>
              <a href='service.html' className='nav-item nav-link'>
                Đăng ký
              </a>
            </div>
            <a
              href='#'
              className='btn btn-danger rounded text-white py-2 px-4 flex-wrap flex-sm-shrink-0 ms-3 border border-0 '
            >
              Đăng tin miễn phí
            </a>
          </div>
        </Container>
      </Navbar>
      <div>
        <nav className='navbar navbar-expand-lg navbar-light bg-white'>
          <div className='container justify-content-center justify-content-md-between'>
            <ul className='navbar-nav flex-row'>
              <li className='nav-item me-2 me-lg-0 d-none d-md-inline-block'>
                <a className='nav-link' href='#'>
                  Trang chủ
                </a>
              </li>
              <li className='nav-item me-2 me-lg-0 d-none d-md-inline-block'>
                <a className='nav-link' href='#'>
                  Cho thuê phòng trọ
                </a>
              </li>
              <li className='nav-item me-2 me-lg-0 d-none d-md-inline-block'>
                <a className='nav-link' href='#'>
                  Cho thuê nhà
                </a>
              </li>
              <li className='nav-item me-2 me-lg-0 d-none d-md-inline-block'>
                <a className='nav-link' href='#'>
                  Cho thuê căn hộ
                </a>
              </li>
              <li className='nav-item me-2 me-lg-0 d-none d-md-inline-block'>
                <a className='nav-link' href='#'>
                  Tin tức
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div
        className='container-fluid bg-secondary mb-5 wow fadeIn'
        data-wow-delay='0.1s'
        style={{ padding: '15px' }}
      >
        <div className='container'>
          <div className='row g-2'>
            <div className='col-md-10'>
              <div className='row g-2'>
                <div className='col-md-3'>
                  <select className='form-select border-0'>
                    <option defaultValue={'1'}>Location</option>
                    <option value='1'>Location 1</option>
                    <option value='2'>Location 2</option>
                    <option value='3'>Location 3</option>
                  </select>
                </div>
                <div className='col-md-3'>
                  <select className='form-select border-0 '>
                    <option defaultValue={'1'}>Property Type</option>
                    <option value='1'>Property Type 1</option>
                    <option value='2'>Property Type 2</option>
                    <option value='3'>Property Type 3</option>
                  </select>
                </div>
                <div className='col-md-3'>
                  <select className='form-select border-0 '>
                    <option defaultValue={'1'}>Location</option>
                    <option value='1'>Location 1</option>
                    <option value='2'>Location 2</option>
                    <option value='3'>Location 3</option>
                  </select>
                </div>
                <div className='col-md-3'>
                  <select className='form-select border-0 '>
                    <option defaultValue={'1'}>Location</option>
                    <option value='1'>Location 1</option>
                    <option value='2'>Location 2</option>
                    <option value='3'>Location 3</option>
                  </select>
                </div>
              </div>
            </div>
            <div className='col-md-2'>
              <button className='btn btn-primary border-0 w-100 '>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
