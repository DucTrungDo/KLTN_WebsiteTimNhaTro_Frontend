import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSquarePlus,
  faFileLines,
  faClock,
  faCalendar,
  faPenToSquare,
  faComment,
} from '@fortawesome/free-regular-svg-icons'
import {
  faAngleRight,
  faDollarSign,
  faPhone,
  faLock,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'

const Dashboard = () => {
  return (
    <div>
      <nav aria-label='breadcrumb' className='bg-body-secondary px-3 py-1 mb-3'>
        <ol className='breadcrumb mb-0 py-1'>
          <li className='breadcrumb-item'>
            <Link to='/' className='text-decoration-none'>
              TroTot123
            </Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Trang quản lý
          </li>
        </ol>
      </nav>
      <Link
        className='btn btn-danger btn-block desktop'
        to='/user/add-new-post'
      >
        <FontAwesomeIcon icon={faSquarePlus} className='me-2' />
        Đăng tin mới
      </Link>
      <div className='list-group dashboard_list_menu mt-4'>
        <Link className='list-group-item' to='/user/post-management'>
          <FontAwesomeIcon icon={faFileLines} className='me-2' />
          Quản lý tin đăng
          <FontAwesomeIcon icon={faAngleRight} className='angle-icon' />
        </Link>
        <Link className='list-group-item' to='/user/recharge'>
          <FontAwesomeIcon icon={faDollarSign} className='me-2' />
          Nạp tiền vào tài khoản
          <FontAwesomeIcon icon={faAngleRight} className='angle-icon' />
        </Link>
        <Link className='list-group-item' to='/user/recharge-history'>
          <FontAwesomeIcon icon={faClock} className='me-2' />
          Lịch sử nạp tiền
          <FontAwesomeIcon icon={faAngleRight} className='angle-icon' />
        </Link>
        <Link className='list-group-item' to='/user/payment-history'>
          <FontAwesomeIcon icon={faCalendar} className='me-2' />
          Lịch sử thanh toán
          <FontAwesomeIcon icon={faAngleRight} className='angle-icon' />
        </Link>
        <Link className='list-group-item' to='/user/profile'>
          <FontAwesomeIcon icon={faPenToSquare} className='me-2' />
          Sửa thông tin cá nhân
          <FontAwesomeIcon icon={faAngleRight} className='angle-icon' />
        </Link>
        <Link className='list-group-item' to='/user/change-phone-number'>
          <FontAwesomeIcon icon={faPhone} className='me-2' />
          Đổi số điện thoại
          <FontAwesomeIcon icon={faAngleRight} className='angle-icon' />
        </Link>
        <Link className='list-group-item' to='/user/change-password'>
          <FontAwesomeIcon icon={faLock} className='me-2' />
          Đổi mật khẩu
          <FontAwesomeIcon icon={faAngleRight} className='angle-icon' />
        </Link>
        <Link className='list-group-item' to='/contact'>
          <FontAwesomeIcon icon={faComment} className='me-2' />
          Liên hệ
          <FontAwesomeIcon icon={faAngleRight} className='angle-icon' />
        </Link>
        <Link className='list-group-item js-user-logout' to='/'>
          <FontAwesomeIcon icon={faArrowRightFromBracket} className='me-2' />
          Đăng xuất
          <FontAwesomeIcon icon={faAngleRight} className='angle-icon' />
        </Link>
      </div>
    </div>
  )
}

export default Dashboard
