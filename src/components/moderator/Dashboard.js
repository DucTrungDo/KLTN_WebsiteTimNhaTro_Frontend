import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons'
import {
  faAngleRight,
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
            Trang quản lý - Moderator
          </li>
        </ol>
      </nav>
      <Link
        className='btn btn-danger btn-block desktop'
        to='/moderator/post-moderation'
      >
        <FontAwesomeIcon icon={faSquareCheck} className='me-2' />
        Kiểm duyệt bài đăng
      </Link>
      <div className='list-group dashboard_list_menu mt-4'>
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
