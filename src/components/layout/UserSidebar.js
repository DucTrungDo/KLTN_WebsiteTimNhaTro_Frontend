import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFileLines,
  faPenToSquare,
  faClock,
  faCalendar,
  faFile,
  faComment,
} from '@fortawesome/free-regular-svg-icons'
import {
  faDollarSign,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import { Link, NavLink } from 'react-router-dom'

import { logout } from '../../actions/userActions'
import { RESET_USER_POST } from '../../constants/postConstants'
import { RESET_INVOICES } from '../../constants/invoiceConstants'

const UserSidebar = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()

  const logoutHandler = () => {
    dispatch(logout())
    dispatch({
      type: RESET_USER_POST,
    })
    dispatch({
      type: RESET_INVOICES,
    })
    Cookies.remove('accessToken')
    alert.success('Logged out successfully.')
    navigate('/')
  }
  return (
    <>
      <div className='user-sidebar col-lg-2 d-none d-lg-block bg-light border-end p-3'>
        <div className='mx-3'>
          <div className='user_info'>
            <Link to='/' className='clearfix'>
              <div className='user_avatar'>
                <img src={user.img} className='user-info' />
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
            {/* <div>
              <span>TK Chính:</span>{' '}
              <span style={{ fontWeight: '700' }}> 0</span>
            </div> */}
            {/* <div className='my-2'>
              <Link className='btn btn-warning btn-sm me-2' to='/user/recharge'>
                Nạp tiền
              </Link>
              <Link className='btn btn-danger btn-sm' to='/user/add-new-post'>
                Đăng tin
              </Link>
            </div> */}
          </div>
          <hr />
          <ul className='nav nav-pills flex-column mb-auto'>
            <li className='nav-item '>
              <NavLink
                to='/user/post-management'
                className='nav-link link-dark'
              >
                <FontAwesomeIcon icon={faFileLines} className='me-2' />
                Quản lý tin đăng
              </NavLink>
            </li>
            <li>
              <NavLink to='/user/profile' className='nav-link link-dark'>
                <FontAwesomeIcon icon={faPenToSquare} className='me-2' />
                Sửa thông tin cá nhân
              </NavLink>
            </li>
            {/* <li>
              <NavLink to='/user/recharge' className='nav-link link-dark'>
                <FontAwesomeIcon icon={faDollarSign} className='me-2' />
                Nạp tiền vào tài khoản
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/user/recharge-history'
                className='nav-link link-dark'
              >
                <FontAwesomeIcon icon={faClock} className='me-2' />
                Lịch sử nạp tiền
              </NavLink>
            </li> */}
            <li>
              <NavLink
                to='/user/payment-history'
                className='nav-link link-dark'
              >
                <FontAwesomeIcon icon={faCalendar} className='me-2' />
                Lịch sử thanh toán
              </NavLink>
            </li>
            <li>
              <NavLink to='/service-price-list' className='nav-link link-dark'>
                <FontAwesomeIcon icon={faFile} className='me-2' />
                Bảng giá dịch vụ
              </NavLink>
            </li>
            <li>
              <button
                type='button'
                data-bs-toggle='modal'
                data-bs-target='#exampleModal'
                className='nav-link link-dark w-100 text-start'
              >
                <FontAwesomeIcon icon={faComment} className='me-2' />
                Trợ giúp, liên hệ
              </button>
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
        className='modal fade'
        id='logoutModal'
        tabIndex='-1'
        aria-labelledby='logoutModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='logoutModalLabel'>
                Đăng xuất
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>Bạn chắc chắn muốn thoát chứ?</div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Hủy
              </button>
              <button
                type='button'
                className='btn btn-primary'
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
      <div
        class='modal fade'
        id='exampleModal'
        tabindex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div class='modal-dialog'>
          <div class='modal-content'>
            <div class='modal-header'>
              <h1 class='modal-title fs-5' id='exampleModalLabel'>
                Trợ giúp, liên hệ
              </h1>
              <button
                type='button'
                class='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div class='modal-body'>
              <h6>Bạn cần hỗ trợ đăng tin hoặc đang có thắc mắc?</h6>
              <br />
              Hãy liên hệ Admin qua Email{' '}
              <strong>
                <a href='https://mail.google.com/mail/#inbox?compose=jrjtXSqmMDFqLsbCvGKqCKvVJmJPDDhCgXQqRrkfMLkwnkMVMSwFNLSRCMDrqplSgrqcNHxF'>
                  alltapduel@gmail.com
                </a>{' '}
              </strong>{' '}
              <br />
              hoặc Sđt/Zalo{' '}
              <a href='https://zalo.me/0346952976' target='_blank'>
                <strong>0346952976</strong>
              </a>
            </div>
            <div class='modal-footer'>
              <button
                type='button'
                class='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserSidebar
