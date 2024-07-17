import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSquareCheck,
  faSquarePlus,
} from '@fortawesome/free-regular-svg-icons'
import Loader from '../layout/Loader'
import { statisticalModerator, clearErrors } from '../../actions/postActions'

const Dashboard = () => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const token = Cookies.get('accessToken')

  const { loading, statistical, error } = useSelector(
    (state) => state.statisticalModerator
  )

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
  }, [dispatch, alert, error])

  useEffect(() => {
    dispatch(statisticalModerator(token))
  }, [dispatch])

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
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className='row ms-0 me-0' style={{ marginTop: '20px' }}>
              <div className='col me-3 border-5 border-primary border-start shadow p-3 mb-3 bg-body rounded d-flex justify-content-between'>
                <div>
                  <div className='text-primary fw-bold'>
                    Tổng số bài đã kiểm duyệt
                  </div>
                  <div className='fw-bold'>
                    {statistical.statistics?.totalPosts}
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faSquarePlus}
                  className='me-2 align-self-center'
                />
              </div>
              <div className='col me-3 border-5 border-success border-start shadow p-3 mb-3 bg-body rounded d-flex justify-content-between'>
                <div>
                  <div className='text-success fw-bold'>Số bài hợp lệ</div>
                  <div className='fw-bold'>
                    {statistical.statistics?.totalApprovedPost}
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faSquarePlus}
                  className='me-2 align-self-center'
                />
              </div>
              <div className='col  me-3 border-5 border-warning border-start shadow p-3 mb-3 bg-body rounded d-flex justify-content-between'>
                <div>
                  <div className='text-warning fw-bold'>Số bài vi phạm</div>
                  <div className='fw-bold'>
                    {statistical.statistics?.totalViolatedPost}
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faSquarePlus}
                  className='me-2 align-self-center'
                />
              </div>
              <div className='col  me-3 border-5 border-info border-start shadow p-3 mb-3 bg-body rounded d-flex justify-content-between'>
                <div>
                  <div className='text-info fw-bold'>Số bài chờ duyệt</div>
                  <div className='fw-bold'>
                    {statistical.statistics?.toModeratedPost}
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faSquarePlus}
                  className='me-2 align-self-center'
                />
              </div>
            </div>
            <Link
              className='btn btn-danger btn-block desktop'
              to='/moderator/post-moderation'
            >
              <FontAwesomeIcon icon={faSquareCheck} className='me-2' />
              Kiểm duyệt bài đăng
            </Link>
          </>
        )}
      </div>
    </>
  )
}

export default Dashboard
