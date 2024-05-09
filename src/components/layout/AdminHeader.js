import React from 'react'
import { Link } from 'react-router-dom'

const AdminHeader = () => {
  return (
    <nav className='py-2 admin-header fixed-top'>
      <div className='container-fluid d-flex flex-wrap'>
        <Link
          className='fs-4 text-decoration-none text-light col-sm-3 col-md-2 navbar-brand ms-3'
          to='/'
        >
          TroTot123
        </Link>
        <ul className='nav me-auto fw-medium'>
          <li className='nav-item'>
            <Link
              to='/'
              className='nav-link link-light px-2 active'
              aria-current='page'
            >
              Trang chủ
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/' className='nav-link link-light px-2'>
              Cho thuê phòng trọ
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/' className='nav-link link-light px-2'>
              Cho thuê nhà
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/' className='nav-link link-light px-2'>
              Cho thuê căn hộ
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/' className='nav-link link-light px-2'>
              Tin tức
            </Link>
          </li>
        </ul>
        <ul className='nav'>
          <li className='nav-item'>
            <a to='/' className='nav-link link-light px-2 fw-bolder fs-6'>
              Hi! Admin
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default AdminHeader
