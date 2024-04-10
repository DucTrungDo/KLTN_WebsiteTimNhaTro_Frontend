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
import { Link } from 'react-router-dom'

const UserSidebar = () => {
  return (
    <div className='col-lg-2 d-none d-lg-block bg-light border-end mx-3 py-3'>
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
          <Link className='btn btn-danger btn-sm ms-2' to='/user/add-new-post'>
            Đăng tin
          </Link>
        </div>
      </div>
      <ul className='nav nav-pills flex-column mb-auto'>
        <li className='nav-item '>
          <Link to='/user/dashboard' className='nav-link active'>
            <FontAwesomeIcon icon={faFileLines} className='me-2' />
            Quản lý tin đăng
          </Link>
        </li>
        <li>
          <Link to='/user/profile' className='nav-link link-dark'>
            <FontAwesomeIcon icon={faPenToSquare} className='me-2' />
            Sửa thông tin cá nhân
          </Link>
        </li>
        <li>
          <Link to='/user/recharge' className='nav-link link-dark'>
            <FontAwesomeIcon icon={faDollarSign} className='me-2' />
            Nạp tiền vào tài khoản
          </Link>
        </li>
        <li>
          <Link to='/user/recharge-history' className='nav-link link-dark'>
            <FontAwesomeIcon icon={faClock} className='me-2' />
            Lịch sử nạp tiền
          </Link>
        </li>
        <li>
          <Link to='/user/payment-history' className='nav-link link-dark'>
            <FontAwesomeIcon icon={faCalendar} className='me-2' />
            Lịch sử thanh toán
          </Link>
        </li>
        <li>
          <Link to='/user/service-price-list' className='nav-link link-dark'>
            <FontAwesomeIcon icon={faFile} className='me-2' />
            Bảng giá dịch vụ
          </Link>
        </li>
        <li>
          <Link to='/contact' className='nav-link link-dark'>
            <FontAwesomeIcon icon={faComment} className='me-2' />
            Liên hệ
          </Link>
        </li>
        <li>
          <Link to='/' className='nav-link link-dark'>
            <FontAwesomeIcon icon={faArrowRightFromBracket} className='me-2' />
            Thoát
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default UserSidebar
