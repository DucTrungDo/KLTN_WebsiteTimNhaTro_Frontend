import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { format } from 'date-fns'
import {
  getUserPosts,
  hideUserPost,
  deleteUserPost,
  clearErrors,
} from '../../actions/postActions'
import {
  HIDE_USER_POST_RESET,
  DELETE_USER_POST_RESET,
} from '../../constants/postConstants'
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import Loader from '../layout/Loader'
import { getProvince, getdistrict, getWard } from '../../actions/provinceAction'
import { getCategories } from '../../actions/categoryActions'

const PostManagement = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProvince())
    dispatch(getCategories())
  }, [dispatch])
  const { provinces } = useSelector((state) => state.province)
  const { districts } = useSelector((state) => state.district)
  const { wards } = useSelector((state) => state.ward)
  const { categories } = useSelector((state) => state.categories)
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const token = Cookies.get('accessToken')
  const [postSlug, setPostSlug] = useState('')
  const [search] = useState('')
  const [categoryId] = useState('')
  const [province] = useState('')
  const [district] = useState('')
  const [ward] = useState('')
  const [tab] = useState('')
  const [filterData, setFilterData] = useState({
    search: search,
    categoryId: categoryId,
    province: province,
    district: district,
    ward: ward,
    tab: tab,
  })

  const { loading, posts, error } = useSelector((state) => state.userPosts)
  const { postLoading, postError, isHided, isDeleted } = useSelector(
    (state) => state.userPost
  )

  useEffect(() => {
    if (
      provinces.length !== 0 &&
      provinces !== undefined &&
      filterData.province !== ''
    ) {
      const keypro = provinces.find(
        (location) => location.full_name === filterData.province
      ).id
      dispatch(getdistrict(keypro))
    }
    if (filterData.province === '') {
      dispatch(getdistrict(''))
    }
    dispatch(getWard(''))
    setFilterData((prevState) => ({
      ...prevState,
      district: '',
      ward: '',
    }))
  }, [filterData.province])

  useEffect(() => {
    if (
      districts.length !== 0 &&
      districts !== undefined &&
      filterData.district !== ''
    ) {
      const keydis = districts.find(
        (location) => location.full_name === filterData.district
      ).id
      dispatch(getWard(keydis))
    }
    if (filterData.district === '') {
      dispatch(getWard(''))
    }
    setFilterData((prevState) => ({
      ...prevState,
      ward: '',
    }))
  }, [filterData.district])

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      Search()
    }
  }
  const Search = () => {
    dispatch(getUserPosts(token, currentPage, filterData))
    setCurrentPage(1)
  }

  console.log(filterData)

  useEffect(() => {
    dispatch(getUserPosts(token, currentPage, filterData))

    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (postError) {
      alert.error(postError)
      dispatch(clearErrors())
    }

    if (isHided) {
      alert.success('Post hided')
      navigate('/user/post-management')
      dispatch({ type: HIDE_USER_POST_RESET })
    }

    if (isDeleted) {
      alert.success('Post deleted')
      navigate('/user/post-management')
      dispatch({ type: DELETE_USER_POST_RESET })
    }
  }, [
    dispatch,
    alert,
    isHided,
    isDeleted,
    error,
    postError,
    navigate,
    filterData,
  ])

  useEffect(() => {
    if (JSON.stringify(posts) !== '{}' && posts !== undefined) {
      setPage(
        Math.round(
          posts.total % 10 !== 0
            ? Math.floor(posts.total / 10) + 1
            : Math.floor(posts.total / 10)
        )
      )
    }
  }, [posts])

  const ChoosePage = (indexPageCurrent) => {
    setCurrentPage(indexPageCurrent)
    dispatch(getUserPosts(token, indexPageCurrent, filterData))
  }
  const NextAndPrevious = (Actions) => {
    if (Actions === 'next') {
      setCurrentPage(currentPage + 1)
      dispatch(getUserPosts(token, currentPage + 1, filterData))
    } else {
      setCurrentPage(currentPage - 1)
      dispatch(getUserPosts(token, currentPage - 1, filterData))
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

  const hidePostHandler = (slug) => {
    dispatch(hideUserPost(slug, token))
  }

  const deletePostHandler = (slug) => {
    dispatch(deleteUserPost(slug, token))
  }

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
      <div className='d-flex justify-content-between'>
        <div className='d-flex bd-highlight mb-2 align-items-center'>
          <div className='bd-highlight me-2'>
            <select
              className='form-select'
              aria-label='Default select example'
              value={filterData.province}
              onChange={(e) =>
                setFilterData((prevState) => ({
                  ...prevState,
                  province: e.target.value,
                }))
              }
            >
              <option value=''>--Chọn Tỉnh/TP--</option>
              {provinces &&
                provinces.map((location) => (
                  <option key={location.id} value={location.full_name}>
                    {location.full_name}
                  </option>
                ))}
            </select>
          </div>
          <div className='bd-highlight me-2'>
            <select
              className='form-select'
              aria-label='Default select example'
              value={filterData.district}
              onChange={(e) =>
                setFilterData((prevState) => ({
                  ...prevState,
                  district: e.target.value,
                }))
              }
            >
              <option value=''>--Chọn Quận/Huyện--</option>
              {districts &&
                districts.map((district) => (
                  <option key={district.id} value={district.full_name}>
                    {district.full_name}
                  </option>
                ))}
            </select>
          </div>
          <div className='bd-highlight me-5'>
            <select
              className='form-select'
              aria-label='Default select example'
              value={filterData.ward}
              onChange={(e) =>
                setFilterData((prevState) => ({
                  ...prevState,
                  ward: e.target.value,
                }))
              }
            >
              <option value=''>--Chọn Phường/Xã--</option>
              {wards &&
                wards.map((ward) => (
                  <option key={ward.id} value={ward.full_name}>
                    {ward.full_name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className='d-flex bd-highlight mb-2 align-items-center'>
          <div className='me-2'>
            <div className='input-group me-3 '>
              <input
                type='text'
                className='form-control'
                placeholder='Tìm Kiếm'
                aria-label='Tìm kiếm'
                aria-describedby='button-addon2'
                onKeyDown={handleKeyPress}
                value={filterData.search}
                onChange={(e) =>
                  setFilterData((prevState) => ({
                    ...prevState,
                    search: e.target.value,
                  }))
                }
              />
              <button
                onClick={() => {
                  Search()
                }}
                className='btn btn-outline-secondary'
                type='button'
                id='button-addon2'
              >
                <FontAwesomeIcon className='me-1 ' icon={faMagnifyingGlass} />
              </button>
            </div>
          </div>
          <div className='bd-highlight me-2'>
            <select
              className='form-select'
              aria-label='Default select example'
              value={filterData.categoryId}
              onChange={(e) =>
                setFilterData((prevState) => ({
                  ...prevState,
                  categoryId: e.target.value,
                }))
              }
            >
              <option value=''>--Lọc theo danh mục--</option>
              {categories.length !== 0
                ? categories.cates.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <div className='bd-highlight'>
            <select
              className='form-select'
              aria-label='Default select example'
              value={filterData.tab}
              onChange={(e) =>
                setFilterData((prevState) => ({
                  ...prevState,
                  tab: e.target.value,
                }))
              }
            >
              <option value=''>--Lọc theo trạng thái--</option>
              <option value='posted'>Các bài đã được duyệt</option>
              <option value='inPay'>Các bài chờ thanh toán</option>
              <option value='inApprove'>Các bài chờ duyệt</option>
              <option value='inViolation'>Các bài vi phạm</option>
              <option value='inHide'>Các bài đã ẩn</option>
            </select>
          </div>
        </div>
      </div>

      {loading || !posts ? (
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
                      Không tìm thấy tin nào. Bấm{' '}
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
                      <td>{idx + 1 + 10 * (currentPage - 1)}</td>
                      <td>
                        <div className='post_thumb'>
                          <Link
                            to={'/post/' + post.slug + '/me'}
                            target='_blank'
                          >
                            <img
                              src={
                                post.images[0]
                                  ? post.images[0]
                                  : 'images/property-test.jpg'
                              }
                            />
                          </Link>
                        </div>
                      </td>
                      <td>
                        <span className='badge text-bg-warning me-1'>
                          {post.categoryId?.name}
                        </span>
                        <Link
                          className='post_title text-decoration-none'
                          to={'/post/' + post.slug + '/me'}
                          target='_blank'
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
                          {post.isPaid &&
                            post.isApproved &&
                            !post.isViolated &&
                            !post.isHided && (
                              <a
                                href=''
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
                            )}

                          {/* {((post.isPaid && !post.isApproved) ||
                            post.isHided ||
                            post.isViolated) && ( */}
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
                              className='feather feather-refresh-ccw'
                            >
                              <polyline points='1 4 1 10 7 10'></polyline>
                              <polyline points='23 20 23 14 17 14'></polyline>
                              <path d='M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15'></path>
                            </svg>
                            Sửa và đăng lại
                          </Link>
                          {/* )} */}
                          {!post.isPaid && (
                            <Link
                              to={'/user/payment/' + post.slug}
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
                              Thanh toán
                            </Link>
                          )}

                          {post.isPaid &&
                            post.isApproved &&
                            !post.isViolated &&
                            !post.isHided && (
                              <>
                                {/* <Link
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
                                </Link> */}

                                <a href='' className='btn btn-sm mt-2'>
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

                                <a href='' className='btn btn-sm mt-2'>
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
                                  Nâng cấp tin
                                </a>

                                <button
                                  className='btn btn-sm mt-2'
                                  type='button'
                                  data-bs-toggle='modal'
                                  data-bs-target='#hideModal'
                                  onClick={() => setPostSlug(post.slug)}
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
                                    className='feather feather-eye-off'
                                  >
                                    <path d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24'></path>
                                    <line x1='1' y1='1' x2='23' y2='23'></line>
                                  </svg>
                                  Ẩn tin
                                </button>
                              </>
                            )}
                          <button
                            className='btn btn-sm mt-2'
                            type='button'
                            data-bs-toggle='modal'
                            data-bs-target='#deleteModal'
                            onClick={() => setPostSlug(post.slug)}
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
                          </button>
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
                          Cập nhật gần nhất:{' '}
                          {format(post.updatedAt, 'HH:mm - dd/MM/yyyy')}
                        </span>
                      </td>
                      <td>
                        <div className='post_price'>
                          <PriceDisplay price={post.price} />
                        </div>
                      </td>
                      <td>{format(post.createdAt, 'HH:mm:ss - dd/MM/yyyy')}</td>
                      <td>28/04/2024 21:26:13</td>
                      <td>
                        <div
                          className='label-success'
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          {post.isHided ? (
                            <span className='text-warning'>Tin đã ẩn</span>
                          ) : post.isViolated ? (
                            <span className='text-danger'>Tin bị vi phạm</span>
                          ) : !post.isPaid ? (
                            <span className='text-info'>
                              Tin chưa thanh toán
                            </span>
                          ) : !post.isApproved ? (
                            <span className='text-primary'>
                              Tin đang chờ duyệt
                            </span>
                          ) : (
                            <span className='text-success'>
                              Tin đã được duyệt
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <nav aria-label='...'>
              <ul className='pagination justify-content-end'>
                <li
                  className={
                    currentPage === 1 ? 'page-item disabled' : 'page-item'
                  }
                >
                  <button
                    onClick={() => {
                      NextAndPrevious('previous')
                    }}
                    className='page-link'
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
                  className={
                    currentPage === page ? 'page-item disabled' : 'page-item'
                  }
                >
                  <button
                    onClick={() => {
                      NextAndPrevious('next')
                    }}
                    className='page-link'
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
      <div
        className='modal fade'
        id='deleteModal'
        tabIndex='-1'
        aria-labelledby='deleteModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='deleteModalLabel'>
                Xác nhận xóa
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>Bạn có chắc là muốn xóa post chứ?</div>
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
                className='btn btn-danger'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={() => deletePostHandler(postSlug)}
                disabled={postLoading ? true : false}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className='modal fade'
        id='hideModal'
        tabIndex='-1'
        aria-labelledby='hideModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='hideModalLabel'>
                Xác nhận ẩn
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>Bạn có chắc là muốn ẩn post chứ?</div>
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
                className='btn btn-danger'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={() => hidePostHandler(postSlug)}
                disabled={postLoading ? true : false}
              >
                Ẩn tin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostManagement
