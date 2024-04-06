import React from 'react'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { logout } from '../../actions/userActions'
import { useAlert } from 'react-alert'

import {
  faArrowRightToBracket,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const { user, loading } = useSelector((state) => state.auth)
  const logoutHandler = () => {
    dispatch(logout())
    alert.success('Logged out successfully.')
    Cookies.remove('accessToken')
  }
  return (
    <>
      <div className='container'>
        <nav className='navbar navbar-expand-lg navbar-light bg-light border-bottom'>
          <div className='container-fluid p-0'>
            <Link to='/'>
              <img src='/images/logo.png' alt='' className='header-image' />
            </Link>
            <button
              className='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarSupportedContent'
              aria-controls='navbarSupportedContent'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon'></span>
            </button>
            <div
              className='collapse navbar-collapse'
              id='navbarSupportedContent'
            >
              <ul className='content-header navbar-nav ms-auto mt-2 mt-lg-0'>
                {/* logic */}
                {!(
                  JSON.stringify(user) === '{}' ||
                  user == null ||
                  user == undefined
                ) ? (
                  <>
                    <li className='nav-item'>
                      <Link
                        className='welcome-text text-decoration-none'
                        to='/user/dashboard'
                        rel='nofollow'
                      >
                        <img
                          src='https://phongtro123.com/images/default-user.png'
                          className='user-info'
                        />
                        <div className=''>
                          <span className='d-block fs-6 mw-200 text-ellipsis overflow-hidden nowrap'>
                            Xin chào, <strong>{user.name}</strong>
                          </span>
                          <span className='fs-6'>
                            TK Chính: <strong>0 VNĐ</strong>
                          </span>
                        </div>
                      </Link>
                    </li>
                    <li className='nav-item dropdown'>
                      <a
                        className='nav-link dropdown-toggle'
                        id='navbarDropdown'
                        href='#'
                        role='button'
                        data-bs-toggle='dropdown'
                        aria-haspopup='true'
                        aria-expanded='false'
                      >
                        <FontAwesomeIcon icon={faHeart} className='me-1' />
                        Quản lý tài khoản
                      </a>
                      <div
                        className='dropdown-menu dropdown-menu-end'
                        aria-labelledby='navbarDropdown'
                      >
                        <a className='dropdown-item' href='#!'>
                          Thông tin cá nhân
                        </a>
                        <a className='dropdown-item' href='#!'>
                          Quản lý tin đăng
                        </a>
                        <div className='dropdown-divider'></div>
                        <Link
                          className='dropdown-item text-danger'
                          to='/'
                          onClick={logoutHandler}
                        >
                          Logout
                        </Link>
                      </div>
                    </li>
                  </>
                ) : (
                  loading !== undefined &&
                  !loading && (
                    <>
                      <li className='nav-item'>
                        <Link
                          to='/login'
                          className='nav-item nav-link align-content-center'
                        >
                          <FontAwesomeIcon icon={faUserPlus} className='me-1' />
                          Đăng nhập
                        </Link>
                      </li>
                      <li className='nav-item'>
                        <Link
                          to='/register'
                          className='nav-item nav-link align-content-center'
                        >
                          <FontAwesomeIcon
                            icon={faArrowRightToBracket}
                            className='me-1'
                          />
                          Đăng ký
                        </Link>
                      </li>
                    </>
                  )
                )}

                {/* logic */}

                <li className='nav-item'>
                  <Link
                    to='/farvorite'
                    className='nav-item nav-link align-content-center'
                  >
                    <FontAwesomeIcon icon={faHeart} className='me-1' />
                    Yêu thích
                  </Link>
                </li>
                <li className='nav-item'>
                  <a
                    href='#'
                    className='btn btn-danger rounded text-white py-2 px-4 flex-wrap flex-sm-shrink-0 border border-0 '
                  >
                    Đăng tin miễn phí
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Header
