import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines } from '@fortawesome/free-regular-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Link, NavLink } from 'react-router-dom'

import { logout } from '../../actions/userActions'
import { resetUserPosts } from '../../actions/postActions'

const ModeratorSidebar = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()

  const logoutHandler = () => {
    dispatch(logout())
    dispatch(resetUserPosts())
    Cookies.remove('accessToken')
    alert.success('Logged out successfully.')
    navigate('/')
  }
  return (
    <>
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
              <Link
                className='nav-link link-dark'
                data-bs-toggle='modal'
                data-bs-target='#logoutModal'
              >
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  className='me-2'
                />
                Thoát
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div
        class='modal fade'
        id='logoutModal'
        tabindex='-1'
        aria-labelledby='logoutModalLabel'
        aria-hidden='true'
      >
        <div class='modal-dialog'>
          <div class='modal-content'>
            <div class='modal-header'>
              <h1 class='modal-title fs-5' id='logoutModalLabel'>
                Đăng xuất
              </h1>
              <button
                type='button'
                class='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div class='modal-body'>Bạn chắc chắn muốn thoát chứ?</div>
            <div class='modal-footer'>
              <button
                type='button'
                class='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Hủy
              </button>
              <button
                type='button'
                class='btn btn-primary'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={logoutHandler}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModeratorSidebar
