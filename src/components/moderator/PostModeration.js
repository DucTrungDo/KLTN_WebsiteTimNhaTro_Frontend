import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons'
import {
  getUnapprovedPosts,
  deleteUserPost,
  clearErrors,
} from '../../actions/postActions'
import Cookies from 'js-cookie'

import Loader from '../layout/Loader'

const PostModeration = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const token = Cookies.get('accessToken')

  const { loading, unapprovedPosts, error } = useSelector(
    (state) => state.unapprovedPosts
  )
  console.log(unapprovedPosts)

  useEffect(() => {
    dispatch(getUnapprovedPosts(token, currentPage))

    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
  }, [dispatch, alert, error, navigate])

  const PriceDisplay = ({ price }) => {
    if (!price) return
    if (price >= 1000000) {
      const trieu = Math.floor(price / 1000000) // Phần triệu
      const tramNgan = Math.floor((price % 1000000) / 1000) // Phần trăm nghìn
      const trieuStr = trieu > 0 ? `${trieu}` : '' // Chuỗi phần triệu

      // Chuỗi phần trăm nghìn với đúng ba chữ số sau dấu chấm
      const tramNganStr =
        tramNgan > 0
          ? `.${(tramNgan / 1000).toFixed(3).slice(2)}`.replace(/0+$/, '')
          : ''

      return `${trieuStr}${tramNganStr} triệu/tháng`
    } else {
      return `${price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đồng/tháng`
    }
  }

  const deletePostHandler = (slug) => {
    dispatch(deleteUserPost(slug, token))
  }

  useEffect(() => {
    if (
      JSON.stringify(unapprovedPosts) !== '{}' &&
      unapprovedPosts !== undefined
    ) {
      setPage(
        Math.round(
          unapprovedPosts.count % 6 !== 0
            ? Math.floor(unapprovedPosts.count / 6) + 1
            : Math.floor(unapprovedPosts.count / 6)
        )
      )
    }
  }, [unapprovedPosts])

  const ChoosePage = (indexPageCurrent) => {
    setCurrentPage(indexPageCurrent)
    dispatch(getUnapprovedPosts(token, indexPageCurrent))
  }
  const NextAndPrevious = (Actions) => {
    if (Actions === 'next') {
      setCurrentPage(currentPage + 1)
      dispatch(getUnapprovedPosts(token, currentPage + 1))
    } else {
      setCurrentPage(currentPage - 1)
      dispatch(getUnapprovedPosts(token, currentPage - 1))
    }
  }

  const [index] = useState(1)
  return (
    <div>
      <nav aria-label='breadcrumb' className='bg-body-secondary px-3 py-1 mb-3'>
        <ol className='breadcrumb mb-0 py-1'>
          <li className='breadcrumb-item'>
            <Link to='/' className='text-decoration-none'>
              TroTot123
            </Link>
          </li>
          <li className='breadcrumb-item'>
            <Link to='/user/dashboard' className='text-decoration-none'>
              Quản lý
            </Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Danh sách tin đăng chưa duyệt
          </li>
        </ol>
      </nav>
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
        <h1 className='h2'>Quản lý tin đăng</h1>
      </div>
      {loading || !unapprovedPosts ? (
        <Loader />
      ) : (
        <div className='d-md-block'>
          <div className='table-responsive'>
            <table className='table table_post_listing table-bordered _table-hover'>
              <thead>
                <tr>
                  <th>Stt</th>
                  <th style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                    Ảnh đại diện
                  </th>
                  <th style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
                    Tiêu đề
                  </th>
                  <th>Giá</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Ngày tạo</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Ngày cập nhật</th>
                  <th style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
                    Hoạt động
                  </th>
                </tr>
              </thead>
              <tbody>
                {unapprovedPosts.posts?.length === 0 ||
                !unapprovedPosts.posts ? (
                  <tr>
                    <td colSpan='7'>
                      Bạn chưa có tin đăng nào. Bấm{' '}
                      <Link
                        className='text-decoration-none'
                        to='/user/add-new-post'
                      >
                        vào đây
                      </Link>{' '}
                      để bắt đầu đăng tin
                    </td>
                  </tr>
                ) : (
                  // Load all post here
                  unapprovedPosts.posts?.map((post, idx) => (
                    <tr key={post._id}>
                      <td>{index + idx}</td>
                      <td>
                        <div className='post_thumb'>
                          <a
                            href='https://phongtro123.com/cho-thue-phong-rong-mat-duong-man-thien-q-9-pr653234.html'
                            target='_blank'
                          >
                            <img src='https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2024/04/23/439979152-377368798623213-8314998822001744453-n_1713882276.jpg' />
                          </a>
                        </div>
                      </td>
                      <td>
                        <span className='badge text-bg-warning me-1'>
                          Phòng trọ
                        </span>
                        <Link
                          className='post_title text-decoration-none'
                          to={'/moderator/view-post-details/' + post.slug}
                          style={{ color: '#055699' }}
                        >
                          {post.title}
                        </Link>
                        <p style={{ marginTop: '10px' }}>
                          <strong>Địa chỉ:</strong> {post.address?.street},{' '}
                          {post.address?.ward}, {post.address?.district},{' '}
                          {post.address?.city}
                        </p>
                        <span
                          style={{
                            display: 'block',
                            marginTop: '10px',
                          }}
                        >
                          <strong>Người đăng:</strong> Đỗ Trung Đức
                        </span>
                      </td>
                      <td>
                        <div className='post_price'>
                          <PriceDisplay price={post.price} />
                        </div>
                      </td>
                      <td>{format(post.createdAt, 'HH:mm:ss - dd/MM/yyyy')}</td>
                      <td>{format(post.updatedAt, 'HH:mm:ss - dd/MM/yyyy')}</td>
                      <td>
                        <Link
                          className='btn btn-info btn-sm text-center w-100 text-white fw-semibold'
                          to='/moderator/view-post-details/{}'
                          type='button'
                        >
                          <FontAwesomeIcon
                            className='me-1 '
                            icon={faSquareCheck}
                          />
                          Kiểm duyệt
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <nav aria-label='...'>
              <ul class='pagination justify-content-end'>
                <li
                  class={currentPage === 1 ? 'page-item disabled' : 'page-item'}
                >
                  <button
                    onClick={() => {
                      NextAndPrevious('previous')
                    }}
                    class='page-link'
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: page }, (_, index) => (
                  <li
                    key={index}
                    className={
                      currentPage === index + 1
                        ? 'page-item active '
                        : 'page-item'
                    }
                  >
                    <button
                      onClick={() => {
                        ChoosePage(index + 1)
                      }}
                      className='page-link'
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li
                  class={
                    currentPage === page ? 'page-item disabled' : 'page-item'
                  }
                >
                  <button
                    onClick={() => {
                      NextAndPrevious('next')
                    }}
                    class='page-link'
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostModeration
