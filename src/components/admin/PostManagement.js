import {
  getPosts,
  deleteAdminPost,
  getUnapprovedPosts,
  clearErrors,
} from '../../actions/postActions'
import { format } from 'date-fns'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layout/Loader'
import Cookies from 'js-cookie'
import { DELETE_ADMIN_POST_RESET } from '../../constants/postConstants'
import DetailPostModal from './DetailPostModal'

const PostManagement = () => {
  const tokenModerator =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY2MTE1NzI1ODJlNTQyOWZiZjQ5Y2UzMSIsImlzQWRtaW4iOmZhbHNlLCJpc01vZGVyYXRvciI6dHJ1ZX0sImlhdCI6MTcxNTQ5Mjg2MCwiZXhwIjoxNzE2MDk3NjYwfQ.SihWyar-EhYA8xKwBTxYKBDgVTmAkX-I0dXXEQ4X6J0'

  const token = Cookies.get('accessToken')
  const dispatch = useDispatch()
  const alert = useAlert()
  const [currentPage, setCurrentPage] = useState(1)
  const [page, setPage] = useState(0)
  const [approvedList, setApprovedList] = useState('approved')
  const [postDetail, setPostDetail] = useState({})
  const { loading, posts, error } = useSelector((state) => state.posts)
  const { isDeleted, postLoading, postError } = useSelector(
    (state) => state.userPost
  )
  const {
    unapprovedPosts,
    loading: upaloading,
    error: errorupa,
  } = useSelector((state) => state.unapprovedPosts)

  useEffect(() => {
    if (error || postError) {
      alert.error(error)
      dispatch(clearErrors())
    }
    if (isDeleted) {
      alert.success('Xoá thành công')
      dispatch({
        type: DELETE_ADMIN_POST_RESET,
      })
    }
    setCurrentPage(1)
    dispatch(getPosts(1))
    dispatch(getUnapprovedPosts(tokenModerator, 1))
  }, [dispatch, alert, error, isDeleted])

  useEffect(() => {
    if (approvedList === 'approved') {
      dispatch(getPosts(1))
    } else if (approvedList === 'unapproved') {
      dispatch(getUnapprovedPosts(tokenModerator, 1))
    }
    setCurrentPage(1)
  }, [approvedList])
  useEffect(() => {
    if (approvedList === 'approved') {
      if (JSON.stringify(posts) !== '{}' && posts !== undefined) {
        setPage(
          Math.round(
            posts.count % 6 !== 0
              ? Math.floor(posts.count / 6) + 1
              : Math.floor(posts.count / 6)
          )
        )
      }
    } else if (approvedList === 'unapproved') {
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
    }
  }, [unapprovedPosts, posts])

  async function ViewDetail(post) {
    setPostDetail(post)
  }
  async function ResetOut() {
    setPostDetail({})
  }
  async function DeletePost(slug) {
    dispatch(deleteAdminPost(token, slug))
  }
  async function ChoisePage(indexPageCurrent) {
    setCurrentPage(indexPageCurrent)
    if (approvedList === 'approved') {
      dispatch(getPosts(indexPageCurrent))
    } else {
      dispatch(getUnapprovedPosts(tokenModerator, indexPageCurrent))
    }
  }
  async function NextAndPrevious(Actions) {
    if (Actions === 'next') {
      setCurrentPage(currentPage + 1)
      if (approvedList === 'approved') {
        dispatch(getPosts(currentPage + 1))
      } else {
        dispatch(getUnapprovedPosts(tokenModerator, currentPage + 1))
      }
    } else {
      setCurrentPage(currentPage - 1)
      if (approvedList === 'approved') {
        dispatch(getPosts(currentPage + 1))
      } else {
        dispatch(getUnapprovedPosts(tokenModerator, currentPage - 1))
      }
    }
  }

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
  return (
    <>
      {loading || upaloading ? (
        <Loader />
      ) : (
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
              <li className='breadcrumb-item'>
                <Link to='/user/dashboard' className='text-decoration-none'>
                  Quản lý
                </Link>
              </li>
              <li className='breadcrumb-item active' aria-current='page'>
                Danh sách bài đăng
              </li>
            </ol>
          </nav>
          <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
            <h1 className='h2'>Quản lý Bài đăng</h1>
          </div>
          <div class='d-flex bd-highlight mb-2 justify-content-end align-items-center'>
            <div class='bd-highlight'>
              <select
                class='form-select'
                aria-label='Default select example'
                value={approvedList}
                onChange={(e) => setApprovedList(e.target.value)}
              >
                <option value='approved'>Tin được duyệt</option>
                <option value='unapproved'>Tin chưa duyệt</option>
              </select>
            </div>
          </div>
          <div class='d-none d-md-block'>
            <div class='table-responsive'>
              <table class='table table_post_listing table-bordered _table-hover'>
                <thead>
                  <tr>
                    <th>No.</th>
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
                  {approvedList === 'approved'
                    ? posts.posts?.map((post, index) => (
                        <tr>
                          <td>{index + 1 + 6 * (currentPage - 1)}</td>
                          <td>
                            <div class='post_thumb'>
                              <a
                                href='https://phongtro123.com/cho-thue-phong-rong-mat-duong-man-thien-q-9-pr653234.html'
                                target='_blank'
                              >
                                <img src='https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2024/04/23/439979152-377368798623213-8314998822001744453-n_1713882276.jpg' />
                              </a>
                            </div>
                          </td>
                          <td>
                            <span class='badge badge-pill bg-warning me-1'>
                              Phòng trọ
                            </span>
                            <a
                              class='post_title'
                              target='_blank'
                              href='https://phongtro123.com/cho-thue-phong-rong-mat-duong-man-thien-q-9-pr653234.html'
                              style={{ color: '#055699' }}
                            >
                              {post.title}
                            </a>
                            <p style={{ marginTop: '10px' }}>
                              <strong>Địa chỉ:</strong>{' '}
                              {post.address.street +
                                ', ' +
                                post.address.ward +
                                ', ' +
                                post.address.district +
                                ', ' +
                                post.address.city}
                            </p>
                            <div class='post_btn_toolbar mt-3'>
                              <button
                                class='btn btn-sm btn_danglai'
                                type='button'
                                data-bs-toggle='modal'
                                data-bs-target='#staticBackdrop'
                                onClick={() => {
                                  ViewDetail(post)
                                }}
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='24'
                                  height='24'
                                  viewBox='0 0 24 24'
                                  fill='none'
                                  stroke='currentColor'
                                  stroke-width='2'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  class='feather feather-refresh-ccw'
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    stroke-width='2'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    class='feather feather-edit-2'
                                  >
                                    <polygon points='16 3 21 8 8 21 3 21 3 16 16 3'></polygon>
                                  </svg>
                                </svg>{' '}
                                Xem chi tiết
                              </button>

                              <a
                                href='https://phongtro123.com/quan-ly/tin-dang/an-tin/653234'
                                class='btn btn-sm'
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='24'
                                  height='24'
                                  viewBox='0 0 24 24'
                                  fill='none'
                                  stroke='currentColor'
                                  stroke-width='2'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  class='feather feather-eye-off'
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    stroke-width='2'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    class='feather feather-star'
                                  >
                                    <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'></polygon>
                                  </svg>
                                </svg>{' '}
                                Nâng cấp tin
                              </a>
                              <a
                                href='https://phongtro123.com/quan-ly/tin-dang/an-tin/653234'
                                class='btn btn-sm'
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='24'
                                  height='24'
                                  viewBox='0 0 24 24'
                                  fill='none'
                                  stroke='currentColor'
                                  stroke-width='2'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  class='feather feather-eye-off'
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    stroke-width='2'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    class='feather feather-plus'
                                  >
                                    <line x1='12' y1='5' x2='12' y2='19'></line>
                                    <line x1='5' y1='12' x2='19' y2='12'></line>
                                  </svg>
                                </svg>{' '}
                                Gia hạn
                              </a>
                              <button
                                class='btn btn-sm '
                                onClick={() => {
                                  DeletePost(post.slug)
                                }}
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='24'
                                  height='24'
                                  viewBox='0 0 24 24'
                                  fill='none'
                                  stroke='currentColor'
                                  stroke-width='2'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  class='feather feather-eye-off'
                                >
                                  <polyline points='3 6 5 6 21 6'></polyline>
                                  <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
                                  <line x1='10' y1='11' x2='10' y2='17'></line>
                                  <line x1='14' y1='11' x2='14' y2='17'></line>
                                </svg>{' '}
                                Xoá tin
                              </button>
                            </div>
                            <span
                              style={{
                                display: 'block',
                                color: '#333',
                                marginTop: '10px',
                              }}
                            >
                              <em>Tên người đăng: {post.userId.name}</em>
                            </span>
                            <span
                              style={{
                                display: 'block',
                                color: '#999',
                                marginTop: '10px',
                              }}
                            >
                              Cập nhật gần nhất:{' '}
                              {format(post.updatedAt, 'dd-mm-yyyy HH:mm:ss')}
                            </span>
                            <span
                              style={{
                                display: 'block',
                                color: '#999',
                                marginTop: '10px',
                              }}
                            >
                              mã tin: {post._id}
                            </span>
                          </td>
                          <td>
                            <div class='post_price'>
                              <PriceDisplay price={post.price} />
                            </div>
                          </td>
                          <td>
                            {format(post.createdAt, 'dd-mm-yyyy HH:mm:ss')}
                          </td>
                          <td>28/04/2024 21:26:13</td>
                          <td>
                            <span
                              class='text text-error'
                              style={{ whiteSpace: 'nowrap' }}
                            >
                              Tin hết hạn
                            </span>
                          </td>
                        </tr>
                      ))
                    : unapprovedPosts.posts?.map((post, index) => (
                        <tr>
                          <td>{index + 1 + 6 * (currentPage - 1)}</td>
                          <td>
                            <div class='post_thumb'>
                              <a
                                href='https://phongtro123.com/cho-thue-phong-rong-mat-duong-man-thien-q-9-pr653234.html'
                                target='_blank'
                              >
                                <img src='https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2024/04/23/439979152-377368798623213-8314998822001744453-n_1713882276.jpg' />
                              </a>
                            </div>
                          </td>
                          <td>
                            <span class='badge badge-pill bg-warning me-1'>
                              Phòng trọ
                            </span>
                            <a
                              class='post_title'
                              target='_blank'
                              href='https://phongtro123.com/cho-thue-phong-rong-mat-duong-man-thien-q-9-pr653234.html'
                              style={{ color: '#055699' }}
                            >
                              {post.title}
                            </a>
                            <p style={{ marginTop: '10px' }}>
                              <strong>Địa chỉ:</strong>{' '}
                              {post.address.street +
                                ', ' +
                                post.address.ward +
                                ', ' +
                                post.address.district +
                                ', ' +
                                post.address.city}
                            </p>
                            <div class='post_btn_toolbar mt-3'>
                              <a
                                href='https://phongtro123.com/quan-ly/tin-dang/dang-lai-tin/653234'
                                class='btn btn-sm btn_danglai'
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='24'
                                  height='24'
                                  viewBox='0 0 24 24'
                                  fill='none'
                                  stroke='currentColor'
                                  stroke-width='2'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  class='feather feather-refresh-ccw'
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    stroke-width='2'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    class='feather feather-edit-2'
                                  >
                                    <polygon points='16 3 21 8 8 21 3 21 3 16 16 3'></polygon>
                                  </svg>
                                </svg>{' '}
                                Xem chi tiết
                              </a>

                              <a
                                href='https://phongtro123.com/quan-ly/tin-dang/an-tin/653234'
                                class='btn btn-sm'
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='24'
                                  height='24'
                                  viewBox='0 0 24 24'
                                  fill='none'
                                  stroke='currentColor'
                                  stroke-width='2'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  class='feather feather-eye-off'
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    stroke-width='2'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    class='feather feather-star'
                                  >
                                    <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'></polygon>
                                  </svg>
                                </svg>{' '}
                                Nâng cấp tin
                              </a>
                              <a
                                href='https://phongtro123.com/quan-ly/tin-dang/an-tin/653234'
                                class='btn btn-sm'
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='24'
                                  height='24'
                                  viewBox='0 0 24 24'
                                  fill='none'
                                  stroke='currentColor'
                                  stroke-width='2'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  class='feather feather-eye-off'
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    stroke-width='2'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    class='feather feather-plus'
                                  >
                                    <line x1='12' y1='5' x2='12' y2='19'></line>
                                    <line x1='5' y1='12' x2='19' y2='12'></line>
                                  </svg>
                                </svg>{' '}
                                Gia hạng
                              </a>
                              <button
                                class='btn btn-sm '
                                onClick={() => {
                                  DeletePost(post.slug)
                                }}
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='24'
                                  height='24'
                                  viewBox='0 0 24 24'
                                  fill='none'
                                  stroke='currentColor'
                                  stroke-width='2'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                  class='feather feather-eye-off'
                                >
                                  <polyline points='3 6 5 6 21 6'></polyline>
                                  <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
                                  <line x1='10' y1='11' x2='10' y2='17'></line>
                                  <line x1='14' y1='11' x2='14' y2='17'></line>
                                </svg>{' '}
                                Xoá tin
                              </button>
                            </div>
                            <span
                              style={{
                                display: 'block',
                                color: '#333',
                                marginTop: '10px',
                              }}
                            >
                              <em>Tên người đăng: {post.userId.name}</em>
                            </span>
                            <span
                              style={{
                                display: 'block',
                                color: '#999',
                                marginTop: '10px',
                              }}
                            >
                              Cập nhật gần nhất:{' '}
                              {format(post.updatedAt, 'dd-mm-yyyy HH:mm:ss')}
                            </span>
                            <span
                              style={{
                                display: 'block',
                                color: '#999',
                                marginTop: '10px',
                              }}
                            >
                              mã tin: {post._id}
                            </span>
                          </td>
                          <td>
                            <div class='post_price'>
                              <PriceDisplay price={post.price} />
                            </div>
                          </td>
                          <td>
                            {format(post.createdAt, 'dd-mm-yyyy HH:mm:ss')}
                          </td>
                          <td>28/04/2024 21:26:13</td>
                          <td>
                            <span
                              class='text text-error'
                              style={{ whiteSpace: 'nowrap' }}
                            >
                              Tin hết hạn
                            </span>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
              <nav aria-label='...'>
                <ul class='pagination justify-content-end'>
                  <li
                    class={
                      currentPage === 1 ? 'page-item disabled' : 'page-item'
                    }
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
                          ChoisePage(index + 1)
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
          <div
            class='modal fade modal-xl'
            id='staticBackdrop'
            data-bs-backdrop='static'
            data-bs-keyboard='false'
            tabindex='-1'
            aria-labelledby='staticBackdropLabel'
            aria-hidden='true'
          >
            <div class='modal-dialog'>
              <div class='modal-content'>
                <div class='modal-header'>
                  <h5 class='modal-title' id='staticBackdropLabel'>
                    Modal title
                  </h5>
                  <button
                    onClick={() => {
                      ResetOut()
                    }}
                    type='button'
                    class='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                <div class='modal-body'>
                  <DetailPostModal
                    post={postDetail}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
                <div class='modal-footer'>
                  <button
                    onClick={() => {
                      ResetOut()
                    }}
                    type='button'
                    class='btn btn-secondary'
                    data-bs-dismiss='modal'
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PostManagement
