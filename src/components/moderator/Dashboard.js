import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons'
import {
  faAngleRight,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import { logout } from '../../actions/userActions'
import { resetUserPosts } from '../../actions/postActions'

const Dashboard = () => {
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
      <div>
        <nav
          aria-label='breadcrumb'
          className='bg-body-secondary px-3 py-1 mb-3'
        >
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
          <Link
            className='list-group-item'
            data-bs-toggle='modal'
            data-bs-target='#logoutModal'
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} className='me-2' />
            Đăng xuất
            <FontAwesomeIcon icon={faAngleRight} className='angle-icon' />
          </Link>
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

export default Dashboard
