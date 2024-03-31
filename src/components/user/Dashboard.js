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

const Dashboard = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-lg-2 d-none d-lg-block bg-light'>
          <ul className='nav nav-pills flex-column mb-auto'>
            <li className='nav-item'>
              <a href='#' className='nav-link active' aria-current='page'>
                <FontAwesomeIcon icon={faFileLines} className='me-2' />
                Quản lý tin đăng
              </a>
            </li>
            <li>
              <a href='#' className='nav-link link-dark'>
                <FontAwesomeIcon icon={faPenToSquare} className='me-2' />
                Sửa thông tin cá nhân
              </a>
            </li>
            <li>
              <a href='#' className='nav-link link-dark'>
                <FontAwesomeIcon icon={faDollarSign} className='me-2' />
                Nạp tiền vào tài khoản
              </a>
            </li>
            <li>
              <a href='#' className='nav-link link-dark'>
                <FontAwesomeIcon icon={faClock} className='me-2' />
                Lịch sử nạp tiền
              </a>
            </li>
            <li>
              <a href='#' className='nav-link link-dark'>
                <FontAwesomeIcon icon={faCalendar} className='me-2' />
                Lịch sử thanh toán
              </a>
            </li>
            <li>
              <a href='#' className='nav-link link-dark'>
                <FontAwesomeIcon icon={faFile} className='me-2' />
                Bảng giá dịch vụ
              </a>
            </li>
            <li>
              <a href='#' className='nav-link link-dark'>
                <FontAwesomeIcon icon={faComment} className='me-2' />
                Liên hệ
              </a>
            </li>
            <li>
              <a href='#' className='nav-link link-dark'>
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  className='me-2'
                />
                Thoát
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
