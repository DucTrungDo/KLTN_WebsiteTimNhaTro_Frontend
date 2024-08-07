import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { getModeratorPosts, clearErrors } from '../../actions/postActions'
import Cookies from 'js-cookie'
import DetailPostModal from '../admin/DetailPostModal'
import { getProvince, getdistrict, getWard } from '../../actions/provinceAction'
import { getCategories } from '../../actions/categoryActions'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import Loader from '../layout/Loader'

const PostModeration = () => {
  const alert = useAlert()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProvince())
    dispatch(getCategories())
  }, [dispatch])

  const [show, setShow] = useState(false)
  const { provinces } = useSelector((state) => state.province)
  const { districts } = useSelector((state) => state.district)
  const { wards } = useSelector((state) => state.ward)
  const { categories } = useSelector((state) => state.categories)
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [postDetail, setPostDetail] = useState({})

  const token = Cookies.get('accessToken')
  const [search] = useState('')
  const [categoryId] = useState('')
  const [province] = useState('')
  const [district] = useState('')
  const [ward] = useState('')
  const [tab] = useState('')
  const [moderatedFilter] = useState('')
  const [filterData, setFilterData] = useState({
    search: search,
    categoryId: categoryId,
    province: province,
    district: district,
    ward: ward,
    tab: tab,
    moderatedFilter: moderatedFilter,
  })
  const { loading, moderatorPosts, error } = useSelector(
    (state) => state.moderatorPosts
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

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const Search = () => {
    dispatch(getModeratorPosts(token, currentPage, filterData))
    setCurrentPage(1)
  }

  useEffect(() => {
    dispatch(getModeratorPosts(token, currentPage, filterData))

    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
  }, [dispatch, alert, error, navigate, filterData])

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

  useEffect(() => {
    if (
      JSON.stringify(moderatorPosts) !== '{}' &&
      moderatorPosts !== undefined
    ) {
      setPage(
        Math.round(
          moderatorPosts.total % 9 !== 0
            ? Math.floor(moderatorPosts.total / 9) + 1
            : Math.floor(moderatorPosts.total / 9)
        )
      )
    }
  }, [moderatorPosts])

  const ChoosePage = (indexPageCurrent) => {
    setCurrentPage(indexPageCurrent)
    dispatch(getModeratorPosts(token, indexPageCurrent, filterData))
  }
  const NextAndPrevious = (Actions) => {
    if (Actions === 'next') {
      setCurrentPage(currentPage + 1)
      dispatch(getModeratorPosts(token, currentPage + 1, filterData))
    } else {
      setCurrentPage(currentPage - 1)
      dispatch(getModeratorPosts(token, currentPage - 1, filterData))
    }
  }

  function ViewDetail(post) {
    setPostDetail(post)
  }

  function ResetOut() {
    setPostDetail({})
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
            <li className='breadcrumb-item'>
              <Link to='/moderator/dashboard' className='text-decoration-none'>
                Quản lý
              </Link>
            </li>
            <li className='breadcrumb-item active' aria-current='page'>
              Kiểm duyệt bài đăng
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
                <option value='myModerated'>
                  Các bài đã được kiểm duyệt bởi tôi
                </option>
                <option value='moderated'>
                  Tất cả các bài đã được kiểm duyệt
                </option>
              </select>
            </div>
          </div>
        </div>
        {loading || !moderatorPosts ? (
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
                    {filterData.tab !== 'moderated' &&
                    filterData.tab !== 'myModerated' ? (
                      <th style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
                        Hoạt động
                      </th>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {moderatorPosts.posts?.length === 0 ||
                  !moderatorPosts.posts ? (
                    <tr>
                      <td colSpan='7'>Không tìm thấy bài đăng nào.</td>
                    </tr>
                  ) : (
                    // Load all post here
                    moderatorPosts.posts?.map((post, idx) => (
                      <tr key={post._id}>
                        <td>{idx + 1 + 9 * (currentPage - 1)}</td>
                        <td>
                          <div className='post_thumb'>
                            <Link
                              to={'/post/' + post.slug + '/moderator'}
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
                            to={'/post/' + post.slug + '/moderator'}
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
                            <strong>Người đăng:</strong> {post.userId?.name}
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
                        {filterData.tab !== 'moderated' &&
                        filterData.tab !== 'myModerated' ? (
                          <td>
                            <button
                              className='btn btn-info btn-sm text-center w-100 text-white fw-semibold'
                              type='button'
                              onClick={() => {
                                ViewDetail(post)
                                handleShow()
                              }}
                            >
                              <FontAwesomeIcon
                                className='me-1 '
                                icon={faSquareCheck}
                              />
                              Kiểm duyệt
                            </button>
                          </td>
                        ) : null}
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
          <Modal.Title>Moderator</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DetailPostModal
            post={postDetail}
            setCurrentPage={setCurrentPage}
            setFilterData={setFilterData}
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
    </>
  )
}

export default PostModeration
