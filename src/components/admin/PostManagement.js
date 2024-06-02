import {
  getPostsAdmin,
  deleteAdminPost,
  getPostsAdminModerate,
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
import { getProvince, getdistrict, getWard } from '../../actions/provinceAction'
import { getCategories } from '../../actions/categoryActions'
import DetailPostModal from './DetailPostModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faHourglassStart,
  faMagnifyingGlass,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
const PostManagement = () => {
  const token = Cookies.get('accessToken')
  const dispatch = useDispatch()
  const alert = useAlert()
  const [currentPage, setCurrentPage] = useState(1)
  const [page, setPage] = useState(0)
  const [whatList, setWhatList] = useState('listallpost')
  const [postDetail, setPostDetail] = useState({})
  const [show, setShow] = useState(false)
  const [filterData, setFilterData] = useState({
    search: '',
    categoryId: '',
    province: '',
    district: '',
    ward: '',
    tab: '',
    moderatedFilter: '',
  })
  const { loading, posts, error } = useSelector((state) => state.posts)
  const { isDeleted, postLoading, postError } = useSelector(
    (state) => state.userPost
  )
  const { provinces } = useSelector((state) => state.province)
  const { districts } = useSelector((state) => state.district)
  const { wards } = useSelector((state) => state.ward)
  const { categories } = useSelector((state) => state.categories)

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
  }, [dispatch, alert, error, isDeleted])
  useEffect(() => {
    if (whatList === 'listallpost') {
      dispatch(getPostsAdmin(token, 1, filterData))
    } else if (whatList === 'listmoderate') {
      dispatch(getPostsAdminModerate(token, 1, filterData))
    }
    setCurrentPage(1)
    dispatch(getProvince())
    dispatch(getCategories())
  }, [dispatch])
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
  useEffect(() => {
    if (
      provinces.length !== 0 &&
      provinces !== undefined &&
      filterData.province !== ''
    ) {
      const keypro = provinces.find(
        (location) => location.province_name === filterData.province
      ).province_id
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
        (location) => location.district_name === filterData.district
      ).district_id
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

  useEffect(() => {
    Search()
  }, [filterData])
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
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
    if (whatList === 'listallpost') {
      dispatch(getPostsAdmin(token, indexPageCurrent, filterData))
    } else {
      dispatch(getPostsAdminModerate(token, indexPageCurrent, filterData))
    }
  }
  async function NextAndPrevious(Actions) {
    if (Actions === 'next') {
      setCurrentPage(currentPage + 1)
      if (whatList === 'listallpost') {
        dispatch(getPostsAdmin(token, currentPage + 1, filterData))
      } else {
        dispatch(getPostsAdminModerate(token, currentPage + 1, filterData))
      }
    } else {
      setCurrentPage(currentPage - 1)
      if (whatList === 'listallpost') {
        dispatch(getPostsAdmin(token, currentPage + 1, filterData))
      } else {
        dispatch(getPostsAdminModerate(token, currentPage - 1, filterData))
      }
    }
  }
  const ChangePage = (changeText) => {
    if (changeText === 'listallpost') {
      setWhatList(changeText)
      dispatch(getPostsAdmin(token, 1, filterData))
    } else if (changeText === 'listmoderate') {
      setWhatList(changeText)
      dispatch(getPostsAdminModerate(token, 1, filterData))
    }
    setFilterData({
      search: '',
      categoryId: '',
      province: '',
      district: '',
      ward: '',
      tab: '',
      moderatedFilter: '',
    })
    setCurrentPage(1)
  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      Search()
    }
  }
  const Search = () => {
    if (whatList === 'listallpost') {
      dispatch(getPostsAdmin(token, 1, filterData))
    } else if (whatList === 'listmoderate') {
      dispatch(getPostsAdminModerate(token, 1, filterData))
    }
    setCurrentPage(1)
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
            Danh sách bài đăng
          </li>
        </ol>
      </nav>
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
        <h1 className='h2'>Quản lý Bài đăng</h1>
      </div>
      <div className='col-lg-6 text-start w-100' data-wow-delay='0.1s'>
        <ul className='nav nav-pills d-inline-flex justify-content-end w-100 mb-3'>
          <li className='nav-item me-2'>
            <button
              className={
                whatList === 'listallpost'
                  ? 'btn btn-outline-secondary active'
                  : 'btn btn-outline-secondary'
              }
              data-bs-toggle='pill'
              href='#tab-1'
              onClick={() => {
                ChangePage('listallpost')
              }}
            >
              <FontAwesomeIcon
                className='me-2 align-self-center'
                icon={faGlobe}
              />
              Trang đăng tin
              <FontAwesomeIcon
                className='ms-2 align-self-center'
                icon={faArrowLeft}
              />
            </button>
          </li>
          <li className='nav-item me-2'>
            <button
              className={
                whatList === 'listmoderate'
                  ? 'btn btn-outline-secondary active'
                  : 'btn btn-outline-secondary'
              }
              data-bs-toggle='pill'
              href='#tab-2'
              onClick={() => {
                ChangePage('listmoderate')
              }}
            >
              <FontAwesomeIcon
                className='me-2 align-self-center'
                icon={faHourglassStart}
              />
              Trang Duyệt tin
              <FontAwesomeIcon
                className='ms-2 align-self-center'
                icon={faArrowLeft}
              />
            </button>
          </li>
        </ul>
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
                  <option
                    key={location.province_id}
                    value={location.province_name}
                  >
                    {location.province_name}
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
                  <option
                    key={district.district_id}
                    value={district.district_name}
                  >
                    {district.district_name}
                  </option>
                ))}
            </select>
          </div>
          <div className='bd-highlight me-2'>
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
                  <option key={ward.ward_id} value={ward.ward_name}>
                    {ward.ward_name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className='d-flex bd-highlight mb-2 align-items-center ms-3'>
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
          {whatList === 'listallpost' ? (
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
                <option value='all'>Tất cả</option>
                <option value='posted'>các bài đăng đã đăng</option>
                <option value='inPay'>chờ thanh toán</option>
                <option value='inApprove'>chờ duyệt bài</option>
                <option value='inViolation'>các bài đăng vi phạm</option>
                <option value='isHide'>các bài đăng đã ẩn</option>
              </select>
            </div>
          ) : (
            <>
              <div className='bd-highlight me-2'>
                <select
                  className='form-select'
                  aria-label='Default select example'
                  value={filterData.moderatedFilter}
                  onChange={(e) =>
                    setFilterData((prevState) => ({
                      ...prevState,
                      moderatedFilter: e.target.value,
                    }))
                  }
                >
                  <option value=''>--Lọc theo status--</option>
                  <option value='approved'>Các bài được duyệt hợp lệ</option>
                  <option value='violated'>Các bài bị vi phạm</option>
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
                  <option value='inApprove'>Các bài đang chờ duyệt</option>
                  <option value='moderated'>Các bài đã duyệt bởi tôi</option>
                  <option value='myModerated'>
                    Tất cả các bài đã được duyệt
                  </option>
                </select>
              </div>
            </>
          )}
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
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
                {posts.posts?.map((post, index) => (
                  <tr>
                    <td>{index + 1 + 10 * (currentPage - 1)}</td>
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
                          onClick={() => {
                            ViewDetail(post)
                            handleShow()
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
                    <td>{format(post.createdAt, 'dd-mm-yyyy HH:mm:ss')}</td>
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
                    currentPage === page || posts.total === 0
                      ? 'page-item disabled'
                      : 'page-item'
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
      <Modal
        show={show}
        onHide={() => {
          ResetOut()
          handleClose()
        }}
        backdrop='static'
        keyboard={false}
        size='xl'
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DetailPostModal
            post={postDetail}
            setCurrentPage={setCurrentPage}
            setFilterData={setFilterData}
            whatList={whatList}
            setShow={setShow}
            setShowModal={setShow}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            class='btn btn-secondary'
            variant='secondary'
            onClick={() => {
              ResetOut()
              handleClose()
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default PostManagement
