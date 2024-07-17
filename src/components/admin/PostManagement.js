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
  const [postSlug, setPostSlug] = useState('')
  const { loading, posts, error } = useSelector((state) => state.posts)
  const { isDeleted, postLoading, postError } = useSelector(
    (state) => state.userPost
  )
  const { provinces } = useSelector((state) => state.province)
  const { districts } = useSelector((state) => state.district)
  const { wards } = useSelector((state) => state.ward)
  const { categories } = useSelector((state) => state.categories)

  useEffect(() => {
    if (whatList === 'listallpost') {
      dispatch(getPostsAdmin(token, 1, filterData))
    } else if (whatList === 'listmoderate') {
      dispatch(getPostsAdminModerate(token, 1, filterData))
    }
    setCurrentPage(1)
    dispatch(getProvince())
    dispatch(getCategories())

    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    if (postError) {
      alert.error(postError)
      dispatch(clearErrors())
    }
    if (isDeleted) {
      alert.success('Xoá thành công')
      dispatch({
        type: DELETE_ADMIN_POST_RESET,
      })
    }
  }, [dispatch, alert, error, postError, isDeleted])

  useEffect(() => {
    if (JSON.stringify(posts) !== '{}' && posts !== undefined) {
      setPage(
        Math.round(
          posts.total % 9 !== 0
            ? Math.floor(posts.total / 9) + 1
            : Math.floor(posts.total / 9)
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
  async function ChoosePage(indexPageCurrent) {
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
        dispatch(getPostsAdmin(token, currentPage - 1, filterData))
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
            <Link to='/admin/dashboard' className='text-decoration-none'>
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
              Trang tin đăng
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
                  <option key={ward.id} value={ward.full_name}>
                    {ward.full_name}
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
                <option value='posted'>Các bài đã được duyệt</option>
                <option value='inPay'>Các bài chờ thanh toán</option>
                <option value='inApprove'>Các bài chờ duyệt</option>
                <option value='inViolation'>Các bài vi phạm</option>
                <option value='inHide'>Các bài đã ẩn</option>
                <option value='expired'>Các bài đã hết hạn</option>
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
                  <option value='myModerated'>Các bài đã duyệt bởi tôi</option>
                  <option value='moderated'>
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
        <div className='d-none d-md-block'>
          <div className='table-responsive'>
            <table className='table table_post_listing table-bordered _table-hover'>
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
                {posts.posts?.length === 0 || !posts.posts ? (
                  <tr>
                    <td colSpan='7'>Không tìm thấy bài đăng nào.</td>
                  </tr>
                ) : (
                  posts.posts?.map((post, index) => (
                    <tr key={post._id}>
                      <td>{index + 1 + 9 * (currentPage - 1)}</td>
                      <td>
                        <div className='post_thumb'>
                          <Link
                            to={'/post/' + post.slug + '/admin'}
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
                        <span className='badge badge-pill bg-warning me-1'>
                          {post.categoryId?.name}
                        </span>
                        <Link
                          className='post_title text-decoration-none'
                          target='_blank'
                          to={'/post/' + post.slug + '/admin'}
                          style={{ color: '#055699' }}
                        >
                          {post.title}
                        </Link>
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
                        <div className='post_btn_toolbar mt-3'>
                          <button
                            className='btn btn-sm btn_danglai'
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
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              className='feather feather-refresh-ccw'
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                className='feather feather-edit-2'
                              >
                                <polygon points='16 3 21 8 8 21 3 21 3 16 16 3'></polygon>
                              </svg>
                            </svg>{' '}
                            {whatList === 'listallpost'
                              ? 'Sửa Tin'
                              : 'Kiểm duyệt tin'}
                          </button>

                          <button
                            className='btn btn-sm'
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
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              className='feather feather-eye-off'
                            >
                              <polyline points='3 6 5 6 21 6'></polyline>
                              <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
                              <line x1='10' y1='11' x2='10' y2='17'></line>
                              <line x1='14' y1='11' x2='14' y2='17'></line>
                            </svg>{' '}
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
                          {format(post.updatedAt, 'dd-MM-yyyy HH:mm:ss')}
                        </span>
                        <span
                          style={{
                            display: 'block',
                            color: '#999',
                            marginTop: '10px',
                          }}
                        >
                          Mã tin: {post._id}
                        </span>
                      </td>
                      <td>
                        <div className='post_price'>
                          <PriceDisplay price={post.price} />
                        </div>
                      </td>
                      <td>
                        {post.startedAt
                          ? format(post.startedAt, 'HH:mm - dd/MM/yyyy')
                          : ' - '}
                      </td>
                      <td>
                        {post.endedAt
                          ? format(post.endedAt, 'HH:mm - dd/MM/yyyy')
                          : ' - '}
                      </td>
                      <td>
                        <div
                          className='label-success'
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          {post.isExpired ? (
                            <span className='text-danger'>Tin hết hạn</span>
                          ) : post.isHided ? (
                            <span className='text-danger-emphasis'>
                              Tin đã ẩn
                            </span>
                          ) : post.isViolated ? (
                            <span className='text-warning'>Tin bị vi phạm</span>
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
                    currentPage === page || posts.total === 0
                      ? 'page-item disabled'
                      : 'page-item'
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
                onClick={() => DeletePost(postSlug)}
                disabled={postLoading ? true : false}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      </div>
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
          <Modal.Title>Admin</Modal.Title>
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
            className='btn btn-secondary'
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
