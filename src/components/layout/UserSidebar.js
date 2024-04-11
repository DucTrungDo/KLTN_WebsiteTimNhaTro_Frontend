import React from 'react'
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

const UserSidebar = () => {
  return (
    <div className='user-sidebar col-lg-2 d-none d-lg-block bg-light border-end p-3'>
      <div className='mx-3'>
        <div className='user_info'>
          <Link to='/' className='clearfix'>
            <div className='user_avatar'>
              <img
                src='https://phongtro123.com/images/default-user.png'
                className='user-info'
              />
            </div>
            <div className='welcome-text text-decoration-none'>
              <div className='ms-2'>
                <span className='d-block'>
                  <strong>Đỗ Trung Đức</strong>
                </span>
                <span
                  className='d-block'
                  style={{ color: '#555', fonSize: '0.9rem' }}
                >
                  0397260965
                </span>
              </div>
            </div>
          </Link>
          <div>
            <span>TK Chính:</span> <span style={{ fontWeight: '700' }}> 0</span>
          </div>
          <div className='my-2 '>
            <Link className='btn btn-warning btn-sm' to='/user/recharge'>
              Nạp tiền
            </Link>
            <Link
              className='btn btn-danger btn-sm ms-2'
              to='/user/add-new-post'
            >
              Đăng tin
            </Link>
          </div>
        </div>
        <ul className='nav nav-pills flex-column mb-auto'>
          <li className='nav-item '>
            <NavLink to='/user/post-management' className='nav-link link-dark'>
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
          <li>
            <NavLink to='/user/recharge' className='nav-link link-dark'>
              <FontAwesomeIcon icon={faDollarSign} className='me-2' />
              Nạp tiền vào tài khoản
            </NavLink>
          </li>
          <li>
            <NavLink to='/user/recharge-history' className='nav-link link-dark'>
              <FontAwesomeIcon icon={faClock} className='me-2' />
              Lịch sử nạp tiền
            </NavLink>
          </li>
          <li>
            <NavLink to='/user/payment-history' className='nav-link link-dark'>
              <FontAwesomeIcon icon={faCalendar} className='me-2' />
              Lịch sử thanh toán
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/user/service-price-list'
              className='nav-link link-dark'
            >
              <FontAwesomeIcon icon={faFile} className='me-2' />
              Bảng giá dịch vụ
            </NavLink>
          </li>
          <li>
            <NavLink to='/contact' className='nav-link link-dark'>
              <FontAwesomeIcon icon={faComment} className='me-2' />
              Liên hệ
            </NavLink>
          </li>
          <li>
            <NavLink to='/' className='nav-link link-dark'>
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

export default UserSidebar
