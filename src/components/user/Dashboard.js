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
          <div className='user_info'>
            <a href='#' className='clearfix'>
              <div className='user_avatar'>
                <img
                  src='https://phongtro123.com/images/default-user.png'
                  className='user-info'
                />
              </div>
              <div className='user_meta'>
                <div className='inner'>
                  <div className='user_name'>Đỗ Trung Đức</div>
                  <div
                    className='user_verify'
                    style={{ color: '#555', fonSize: '0.9rem' }}
                  >
                    0397260965
                  </div>
                </div>
              </div>
            </a>
            <div>
              <span>TK Chính:</span>{' '}
              <span style={{ fontWeight: '700' }}> 0</span>
            </div>
            <a
              className='btn btn-warning btn-sm mr-1'
              href='https://phongtro123.com/quan-ly/nap-tien.html'
            >
              Nạp tiền
            </a>
            <a
              className='btn btn-danger btn-sm'
              href='https://phongtro123.com/quan-ly/dang-tin-moi.html'
            >
              Đăng tin
            </a>
          </div>
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
