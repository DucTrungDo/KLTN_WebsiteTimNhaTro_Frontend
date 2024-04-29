import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import {
  getUserPosts,
  deleteUserPost,
  clearErrors,
} from '../../actions/postActions'
import { DELETE_USER_POST_RESET } from '../../constants/postConstants'
import Cookies from 'js-cookie'

import Loader from '../layout/Loader'

const PostManagement = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const token = Cookies.get('accessToken')

  const { loading, posts, error } = useSelector((state) => state.userPosts)
  const { postLoading, postError, isDeleted } = useSelector(
    (state) => state.userPost
  )

  useEffect(() => {
    dispatch(getUserPosts(token))

    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (postError) {
      alert.error(postError)
      dispatch(clearErrors())
    }

    if (isDeleted) {
      alert.success('Post deleted')
      navigate('/user/post-management')
      dispatch({ type: DELETE_USER_POST_RESET })
    }
  }, [dispatch, alert, isDeleted, error, postError, navigate])

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
            Danh sách tin đăng
          </li>
        </ol>
      </nav>
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
        <h1 className='h2'>Quản lý tin đăng</h1>
      </div>
      {loading || !posts ? (
        <Loader />
      ) : (
        <div className='d-none d-md-block'>
          <div className='table-responsive'>
            <table className='table table_post_listing table-bordered _table-hover'>
              <thead>
                <tr>
                  <th>Stt</th>
                  <th style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                    Ảnh đại diện
                  </th>
                  <th>Tiêu đề</th>
                  <th>Giá</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Ngày bắt đầu</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Ngày hết hạn</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {posts.posts?.length === 0 || !posts.posts ? (
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
                  posts.posts?.map((post, idx) => (
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
                          to={'/post/' + post.slug}
                          style={{ color: '#055699' }}
                        >
                          {post.title}
                        </Link>
                        <p style={{ marginTop: '10px' }}>
                          <strong>Địa chỉ:</strong> {post.address?.street},{' '}
                          {post.address?.ward}, {post.address?.district},{' '}
                          {post.address?.city}
                        </p>
                        <div className='post_btn_toolbar mt-3'>
                          <a
                            href='https://phongtro123.com/quan-ly/tin-dang/gia-han-tin/653234'
                            className='btn btn-sm mt-2 btn_danglai btn-warning text-success'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='24'
                              height='24'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth={2}
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              className='feather feather-plus'
                            >
                              <line x1='12' y1='5' x2='12' y2='19'></line>
                              <line x1='5' y1='12' x2='19' y2='12'></line>
                            </svg>
                            Thêm ngày
                          </a>
                          <a
                            href='https://phongtro123.com/quan-ly/post/gan-nhan/653234'
                            className='btn btn-sm mt-2'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='24'
                              height='24'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth={2}
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              className='feather feather-tag'
                            >
                              <path d='M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z'></path>
                              <line x1='7' y1='7' x2='7' y2='7'></line>
                            </svg>
                            Gắn nhãn
                          </a>
                          <Link
                            to={'/user/post/edit/' + post.slug}
                            className='btn btn-sm mt-2'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='24'
                              height='24'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth={2}
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              className='feather feather-edit-2'
                            >
                              <polygon points='16 3 21 8 8 21 3 21 3 16 16 3'></polygon>
                            </svg>
                            Sửa tin
                          </Link>
                          <a
                            href='https://phongtro123.com/quan-ly/tin-dang/day-tin/653234'
                            className='btn btn-sm mt-2'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='24'
                              height='24'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth={2}
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              className='feather feather-arrow-up'
                            >
                              <line x1='12' y1='19' x2='12' y2='5'></line>
                              <polyline points='5 12 12 5 19 12'></polyline>
                            </svg>
                            Đẩy tin
                          </a>
                          <a
                            href='https://phongtro123.com/quan-ly/tin-dang/nang-cap-tin/653234'
                            className='btn btn-sm mt-2'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='24'
                              height='24'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth={2}
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              className='feather feather-star'
                            >
                              <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'></polygon>
                            </svg>
                            Nâng cấp VIP
                          </a>
                          <a
                            href='https://phongtro123.com/quan-ly/tin-dang/an-tin/653234'
                            className='btn btn-sm mt-2'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='24'
                              height='24'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth={2}
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              className='feather feather-eye-off'
                            >
                              <path d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24'></path>
                              <line x1='1' y1='1' x2='23' y2='23'></line>
                            </svg>
                            Ẩn tin
                          </a>
                          <a
                            className='btn btn-sm mt-2'
                            onClick={() => deletePostHandler(post.slug)}
                            disabled={postLoading ? true : false}
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='24'
                              height='24'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth={2}
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              className='feather feather-trash-2'
                            >
                              <polyline points='3 6 5 6 21 6'></polyline>
                              <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
                              <line x1='10' y1='11' x2='10' y2='17'></line>
                              <line x1='14' y1='11' x2='14' y2='17'></line>
                            </svg>
                            Xóa tin
                          </a>
                        </div>
                        <span
                          style={{
                            display: 'block',
                            color: '#333',
                            marginTop: '10px',
                          }}
                        >
                          <em>Lượt hiển thị: 1</em>
                        </span>
                        <span
                          style={{
                            display: 'block',
                            color: '#999',
                            marginTop: '10px',
                          }}
                        >
                          Cập nhật gần nhất: 1 phút trước
                        </span>
                      </td>
                      <td>
                        <div className='post_price'>
                          <PriceDisplay price={post.price} />
                        </div>
                      </td>
                      <td>23/04/2024 21:26:13</td>
                      <td>28/04/2024 21:26:13</td>
                      <td>
                        <span
                          className='text-success label-success'
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          Đang hiển thị
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostManagement
