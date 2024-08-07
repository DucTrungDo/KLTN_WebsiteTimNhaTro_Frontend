import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines, faFile } from '@fortawesome/free-regular-svg-icons'
import {
  faChartLine,
  faArrowRightFromBracket,
  faList,
  faReceipt,
  faUser,
  faBoxArchive,
} from '@fortawesome/free-solid-svg-icons'
import { Link, NavLink } from 'react-router-dom'

import { logout } from '../../actions/userActions'
import { RESET_USER_POST } from '../../constants/postConstants'
import { RESET_INVOICES } from '../../constants/invoiceConstants'

const AdminSidebar = () => {
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
      <div className='admin-sidebar col-lg-2 d-none d-lg-block bg-light border-end p-3'>
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

            {/* <div className='my-2'>
              <Link className='btn btn-warning btn-sm me-2' to='/user/recharge'>
                Nạp tiền
              </Link>
              <Link className='btn btn-danger btn-sm' to='/user/add-new-post'>
                Đăng tin
              </Link>
            </div> */}
            <hr />
          </div>
          <ul className='nav nav-pills flex-column mb-auto'>
          <li className='nav-item '>
              <NavLink
                to='/admin/dashboard'
                className='nav-link link-dark'
              >
                <FontAwesomeIcon icon={faChartLine} className='me-2' />
                Xem thống kê
              </NavLink>
            </li>
            <li className='nav-item '>
              <NavLink
                to='/admin/post-management'
                className='nav-link link-dark'
              >
                <FontAwesomeIcon icon={faFileLines} className='me-2' />
                Quản lý tin đăng
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/admin/user-management'
                className='nav-link link-dark'
              >
                <FontAwesomeIcon icon={faUser} className='me-2' />
                Quản lý người dùng
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/admin/category-management'
                className='nav-link link-dark'
              >
                <FontAwesomeIcon icon={faList} className='me-2' />
                Quản lý danh mục
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/admin/pack-management'
                className='nav-link link-dark'
              >
                <FontAwesomeIcon icon={faBoxArchive} className='me-2' />
                Quản lý gói tin
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/admin/invoice-management'
                className='nav-link link-dark'
              >
                <FontAwesomeIcon icon={faReceipt} className='me-2' />
                Quản lý hóa đơn
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/service-price-list'
                className='nav-link link-dark'
              >
                <FontAwesomeIcon icon={faFile} className='me-2' />
                Bảng giá dịch vụ
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
    </>
  )
}

export default AdminSidebar
