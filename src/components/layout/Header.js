import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import {
  faArrowRightToBracket,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  return (
    <header>
      <nav className='navbar navbar-expand-lg bg-body-tertiary'>
        <div className='container'>
          <Link to='/'>
            <img src='./images/logo.png' alt='' className='header-image' />
          </Link>
          <div className='collapse navbar-collapse' id='navbarCollapse'>
            <div className='navbar-nav ms-auto py-0'>
              <Link to='/farvorite' className='nav-item nav-link'>
                <FontAwesomeIcon icon={faHeart} className='me-1' />
                Yêu thích
              </Link>
              <Link to='/login' className='nav-item nav-link mx-3'>
                <FontAwesomeIcon icon={faUserPlus} className='me-1' />
                Đăng nhập
              </Link>
              <Link to='/register' className='nav-item nav-link'>
                <FontAwesomeIcon
                  icon={faArrowRightToBracket}
                  className='me-1'
                />
                Đăng ký
              </Link>
            </div>
            <a
              href='#'
              className='btn btn-danger rounded text-white py-2 px-4 flex-wrap flex-sm-shrink-0 ms-3 border border-0 '
            >
              Đăng tin miễn phí
            </a>
          </div>
        </div>
      </nav>
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
    </header>
  )
}

export default Header
