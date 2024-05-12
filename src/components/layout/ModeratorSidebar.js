import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFileLines,
  faFile,
  faComment,
} from '@fortawesome/free-regular-svg-icons'
import {
  faArrowRightFromBracket,
  faList,
  faReceipt,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { Link, NavLink } from 'react-router-dom'

import { logout } from '../../actions/userActions'
import { resetUserPosts } from '../../actions/postActions'

const ModeratorSidebar = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const alert = useAlert()

  const logoutHandler = () => {
    dispatch(logout())
    dispatch(resetUserPosts())
    Cookies.remove('accessToken')
    alert.success('Logged out successfully.')
  }
  return (
    <div className='moderator-sidebar col-lg-2 d-none d-lg-block bg-light border-end p-3'>
      <div className='mx-3'>
        <div className='user_info'>
          <Link to='/' className='clearfix'>
            <div className='user_avatar'>
              <img src='/images/default_avatar.jpg' className='user-info' />
            </div>
            <div className='welcome-text text-decoration-none'>
              <div className='ms-2'>
                <span className='d-block'>
                  <strong>{user.name}</strong>
                </span>
                <span
                  className='d-block'
                  style={{ color: '#555', fonSize: '0.9rem' }}
                >
                  {user.phone}
                </span>
              </div>
            </div>
          </Link>

          <div className='my-2'>
            <Link className='btn btn-warning btn-sm me-2' to='/user/recharge'>
              Nạp tiền
            </Link>
            <Link className='btn btn-danger btn-sm' to='/user/add-new-post'>
              Đăng tin
            </Link>
          </div>
        </div>
        <ul className='nav nav-pills flex-column mb-auto'>
          <li className='nav-item '>
            <NavLink
              to='/moderator/post-moderation'
              className='nav-link link-dark'
            >
              <FontAwesomeIcon icon={faFileLines} className='me-2' />
              Quản lý tin đăng
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/'
              className='nav-link link-dark'
              onClick={logoutHandler}
            >
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className='me-2'
              />
              Thoát
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ModeratorSidebar
