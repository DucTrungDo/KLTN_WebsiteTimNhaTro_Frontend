import React from 'react'
import { Link } from 'react-router-dom'

const UserHeader = () => {
  return (
    <nav className='py-2 bg-body-tertiary border-bottom'>
      <div className='container d-flex flex-wrap'>
        <Link className='fs-4 text-decoration-none text-dark ms-3  me-5' to='/'>
          TroTot123
        </Link>
        <ul className='nav me-auto ms-5 '>
          <li className='nav-item'>
            <Link
              href='#'
              className='nav-link link-dark px-2 active'
              aria-current='page'
            >
              Trang chủ
            </Link>
          </li>
          <li className='nav-item'>
            <Link href='#' className='nav-link link-dark px-2'>
              Cho thuê phòng trọ
            </Link>
          </li>
          <li className='nav-item'>
            <Link href='#' className='nav-link link-dark px-2'>
              Cho thuê nhà
            </Link>
          </li>
          <li className='nav-item'>
            <Link href='#' className='nav-link link-dark px-2'>
              Cho thuê căn hộ
            </Link>
          </li>
          <li className='nav-item'>
            <Link href='#' className='nav-link link-dark px-2'>
              Tin tức
            </Link>
          </li>
        </ul>
        {/* <ul className='nav'>
          <li className='nav-item'>
            <a href='#' className='nav-link link-dark px-2'>
              Login
            </a>
          </li>
          <li className='nav-item'>
            <a href='#' className='nav-link link-dark px-2'>
              Sign up
            </a>
          </li>
        </ul> */}
      </div>
    </nav>
  )
}

export default UserHeader
