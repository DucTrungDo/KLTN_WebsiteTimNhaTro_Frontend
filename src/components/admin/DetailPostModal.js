import axios from 'axios'
import { getProfileUserAdmin } from '../../actions/userActions'
import { getProvince, getdistrict, getWard } from '../../actions/provinceAction'
import {
  editPostAdmin,
  getPostsAdmin,
  getPostsAdminModerate,
  clearErrors,
} from '../../actions/postActions'
import { getCategories } from '../../actions/categoryActions'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import Cookies from 'js-cookie'
import MapD from '../googleMap/MapD'
import {
  getUnapprovedPosts,
  approvePost,
  reportViolatingPost,
} from '../../actions/postActions'
import {
  UPDATE_ADMIN_POST_RESET,
  MODERATOR_APPROVE_POST_RESET,
  MODERATOR_REPORT_POST_RESET,
} from '../../constants/postConstants'
const DetailPostModal = ({ post, setCurrentPage, setFilterData, whatList }) => {
  const token = Cookies.get('accessToken')
  const navigate = useNavigate()
  const alert = useAlert()
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setprice] = useState(0)
  const [area, setArea] = useState(0)
  const [category, setCategory] = useState('')
  const [street, setStreet] = useState('')
  const [slug, setSlug] = useState('')
  const [userName, setUserName] = useState('')
  const [userPhone, setUserPhone] = useState('')

  const [provinceName, setProvinceName] = useState('')
  const [districtName, setDistrictName] = useState('')
  const [wardName, setWardName] = useState('')

  const [fetchDataInProgress, setFetchDataInProgress] = useState(false)
  const [address, setAddress] = useState({
    city: '',
    district: '',
    ward: '',
    street: '',
  })
  const resetFilterModerator = {
    search: '',
    categoryId: '',
    province: '',
    district: '',
    ward: '',
    tab: '',
    moderatedFilter: '',
  }
  const [addressAbsolute, setAddressAbsolute] = useState('')
  const [warningComment, setWarningComment] = useState('')

  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const { categories } = useSelector((state) => state.categories)
  const { error, isSuccess } = useSelector((state) => state.postEdit)
  const { user } = useSelector((state) => state.user)
  const { user: who } = useSelector((state) => state.auth)
  const {
    loading: unapprovedPostLoading,
    isApproved,
    isReported,
    error: unapprovedPostError,
  } = useSelector((state) => state.unapprovedPost)
  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (unapprovedPostError) {
      alert.error(unapprovedPostError)
      dispatch(clearErrors())
    }

    if (isSuccess) {
      alert.success('cập nhật thành công')
      dispatch({
        type: UPDATE_ADMIN_POST_RESET,
      })
      if (whatList === 'listallpost') {
        dispatch(getPostsAdmin(token, 1, resetFilterModerator))
      } else {
        dispatch(getPostsAdminModerate(token, 1, resetFilterModerator))
      }
      setFilterData(resetFilterModerator)
      setCurrentPage(1)
    }

    if (isApproved) {
      alert.success('Post approved successfully')
      dispatch({
        type: MODERATOR_APPROVE_POST_RESET,
      })
      if (who.isAdmin) {
        if (whatList === 'listallpost') {
          dispatch(getPostsAdmin(token, 1, resetFilterModerator))
        } else {
          dispatch(getPostsAdminModerate(token, 1, resetFilterModerator))
        }
      } else {
        dispatch(getUnapprovedPosts(token, 1, resetFilterModerator))
      }

      setFilterData(resetFilterModerator)
      setCurrentPage(1)
    }

    if (isReported) {
      alert.success('Post reported successfully')
      dispatch({
        type: MODERATOR_REPORT_POST_RESET,
      })
      if (who.isAdmin) {
        if (whatList === 'listallpost') {
          dispatch(getPostsAdmin(token, 1, resetFilterModerator))
        } else {
          dispatch(getPostsAdminModerate(token, 1, resetFilterModerator))
        }
      } else {
        dispatch(getUnapprovedPosts(token, 1, resetFilterModerator))
      }
      setFilterData(resetFilterModerator)
      setCurrentPage(1)
    }
  }, [dispatch, alert, error, isSuccess, isApproved, isReported])

  async function fetchDataInitialization() {
    try {
      setFetchDataInProgress(true)
      const response = await axios.get('https://vapi.vnappmob.com/api/province')
      setProvinces(response.data.results)
      setProvinceName(post.address.city)
      const keypro = await response.data.results.find(
        (location) => location.province_name === post.address.city
      ).province_id
      const response2 = await axios.get(
        `https://vapi.vnappmob.com/api/province/district/${keypro}`
      )
      setDistricts(response2.data.results)
      setDistrictName(post.address.district)
      const keydis = await response2.data.results.find(
        (location) => location.district_name === post.address.district
      ).district_id
      const response3 = await axios.get(
        ` https://vapi.vnappmob.com/api/province/ward/${keydis}`
      )
      setWards(response3.data.results)
      setWardName(post.address.ward)
      setStreet(post.address.street)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setFetchDataInProgress(false)
    }
  }
  async function fetchData(change) {
    try {
      const response = await axios.get('https://vapi.vnappmob.com/api/province')
      setProvinces(response.data.results)
      const keypro = await response.data.results.find(
        (location) => location.province_name === provinceName
      ).province_id
      const response2 = await axios.get(
        `https://vapi.vnappmob.com/api/province/district/${keypro}`
      )
      setDistricts(response2.data.results)

      if (change === 'provinceChange') {
        setDistrictName('')
        setWardName('')
        setStreet('')
      }
      const keydis = await response2.data.results.find(
        (location) => location.district_name === districtName
      ).district_id
      const response3 = await axios.get(
        ` https://vapi.vnappmob.com/api/province/ward/${keydis}`
      )
      setWards(response3.data.results)
      if (change === 'districtChange') {
        setWardName('')
        setStreet('')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch, navigate, alert, error])
  useEffect(() => {
    setCategory(post.categoryId?._id)
    setTitle(post?.title)
    setDescription(post?.description)
    setprice(post?.price)
    setArea(post?.area)
    setSlug(post?.slug)
    setAddress({
      city: post.address?.city,
      district: post.address?.district,
      ward: post.address?.ward,
      street: post.address?.street,
    })
    if (JSON.stringify(post) !== '{}') {
      fetchDataInitialization()
      dispatch(getProfileUserAdmin(token, post.userId._id))
    }
    setWarningComment('')
  }, [post])
  useEffect(() => {
    if (user !== undefined) {
      setUserName(user.user.name)
      setUserPhone(user.user.phone)
    }
    console.log(categories)
    console.log(category)
  }, [user])

  useEffect(() => {
    if (!fetchDataInProgress && provinceName !== '') {
      fetchData('provinceChange')
    }
    if (provinceName === '') {
      setDistricts([])
      setDistrictName('')
    }
  }, [provinceName])
  useEffect(() => {
    if (!fetchDataInProgress && districtName !== '') {
      fetchData('districtChange')
    }
    if (districtName === '') {
      setWards([])
      setWardName('')
    }
  }, [districtName])
  useEffect(() => {
    if (!fetchDataInProgress && wardName !== '') {
      fetchData('wardChange')
    }
    if (wardName === '') {
      setStreet('')
    }
  }, [wardName])

  useEffect(() => {
    const fields = [provinceName, districtName, wardName, street]
    const isEmpty = fields.some((field) => field.trim() === '')
    if (isEmpty) {
      setAddressAbsolute('')
    } else {
      setAddressAbsolute(
        provinceName + '/' + districtName + '/' + wardName + '/' + street
      )
      setAddress({
        city: provinceName,
        district: districtName,
        ward: wardName,
        street: street,
      })
    }
  }, [provinceName, districtName, wardName, street])
  function editPostAdminHandler() {
    const fields = [
      title,
      description,
      provinceName,
      districtName,
      wardName,
      street,
      category,
    ]

    const isEmpty = fields.some((field) => field.trim() === '')
    console.log(isEmpty)
    if (isEmpty || price <= 100000 || area <= 10) {
      alert.error('thiếu thông tin')
    } else {
      console.log('ok')
      const token = Cookies.get('accessToken')
      dispatch(
        editPostAdmin(token, slug, {
          address: address,
          area: area,
          price: price,
          categoryId: category,
          description: description,
          title: title,
        })
      )
    }
  }
  function approvePostHandler() {
    console.log(token)
    dispatch(approvePost(post.slug, token))
  }
  function reportPostHandler() {
    if (!warningComment.trim()) {
      // Kiểm tra xem input có giá trị không
      alert.error('Vui lòng nhập lý do từ chối duyệt.') // Hiển thị thông báo nếu input trống
      return
    }
    dispatch(reportViolatingPost(post.slug, token, warningComment))
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
            Đăng tin
          </li>
        </ol>
      </nav>
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
        <h1 className='h1'>Đăng tin mới</h1>
      </div>
      <div className='row'>
        <div className='col-md-8'>
          <div className='row'>
            <div className='col-md-12'>
              <h3>Địa chỉ cho thuê</h3>
            </div>
          </div>
          <div className='row mt-3'>
            <div className='col-md-3'>
              <div className='form-group'>
                <label htmlFor='province_id' className='col-form-label'>
                  Tỉnh/Thành phố
                </label>
                <select
                  id='province_id'
                  name='province_id'
                  className='form-control select2-hidden-accessible'
                  required=''
                  data-msg-required='Chưa chọn Tỉnh/TP'
                  tabIndex='-1'
                  disabled={who.isModerator === true ? 'readOnly' : ''}
                  aria-hidden='true'
                  value={provinceName}
                  onChange={(e) => setProvinceName(e.target.value)}
                >
                  <option value=''>-- Chọn Tỉnh/TP --</option>

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
            </div>
            <div className='col-md-3'>
              <div className='form-group'>
                <label className='col-form-label' htmlFor='district_id'>
                  Quận/Huyện
                </label>
                <select
                  name='district_id'
                  id='district_id'
                  className='form-control select2-hidden-accessible'
                  required=''
                  data-msg-required='Chưa chọn Quận/Huyện'
                  tabIndex='-1'
                  aria-hidden='true'
                  disabled={who.isModerator === true ? 'readOnly' : ''}
                  value={districtName}
                  onChange={(e) => setDistrictName(e.target.value)}
                >
                  <option value=''>chọn quận huyện</option>
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
            </div>
            <div className='col-md-3'>
              <div className='form-group'>
                <label className='col-form-label' htmlFor='phuongxa'>
                  Phường/Xã
                </label>
                <select
                  disabled={who.isModerator === true ? 'readOnly' : ''}
                  className='form-control select2-hidden-accessible'
                  name='phuongxa'
                  id='phuongxa'
                  tabIndex='-1'
                  aria-hidden='true'
                  value={wardName}
                  onChange={(e) => setWardName(e.target.value)}
                >
                  <option value=''>chọn phường xã</option>
                  {wards &&
                    wards.map((ward) => (
                      <option key={ward.ward_id} value={ward.ward_name}>
                        {ward.ward_name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-3'>
              <div className='form-group'>
                <label htmlFor='street_number' className='col-form-label'>
                  Đường phố
                </label>
                <input
                  type='text'
                  className='form-control'
                  name='street_number'
                  id='street_number'
                  readOnly={who.isModerator === true ? 'readOnly' : ''}
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <div className='form-group'>
                <label htmlFor='diachi' className='col-form-label'>
                  Địa chỉ chính xác
                </label>
                <input
                  type='text'
                  className='form-control'
                  readOnly='readOnly'
                  name='dia_chi'
                  id='diachi'
                  required=''
                  data-msg-required='Chưa chọn khu vực đăng tin'
                  value={addressAbsolute}
                  onChange={(e) => setAddressAbsolute(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='form-group row mt-5'>
            <div className='col-md-12'>
              <h3>Thông tin mô tả</h3>
            </div>
          </div>
          <div className='form-group row mt-3'>
            <label htmlFor='post_cat' className='col-md-12 col-form-label'>
              Loại chuyên mục
            </label>
            <div className='col-md-6'>
              <select
                className='form-control valid'
                id='post_cat'
                name='loai_chuyen_muc'
                required=''
                data-msg-required='Chưa chọn loại chuyên mục'
                aria-invalid='false'
                disabled={who.isModerator === true ? 'readOnly' : ''}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value=''>-- Chọn loại chuyên mục --</option>
                {categories.length !== 0
                  ? categories.cates.map((category) => (
                      <option value={category._id}>{category.name}</option>
                    ))
                  : null}
              </select>
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='post_title' className='col-md-12 col-form-label'>
              Tiêu đề
            </label>
            <div className='col-md-12'>
              <input
                type='text'
                className='form-control'
                name='tieu_de'
                id='post_title'
                minLength='30'
                maxLength='120'
                required=''
                readOnly={who.isModerator === true ? 'readOnly' : ''}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                data-msg-required='Tiêu đề không được để trống'
                data-msg-minlength='Tiêu đề quá ngắn'
                data-msg-maxlength='Tiêu đề quá dài'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='post_content' className='col-md-12 col-form-label'>
              Nội dung mô tả
            </label>
            <div className='col-md-12'>
              <textarea
                className='form-control'
                name='noi_dung'
                id='post_content'
                rows='10'
                required=''
                minLength='100'
                readOnly={who.isModerator === true ? 'readOnly' : ''}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                data-msg-required='Bạn chưa nhập nội dung'
                data-msg-minlength='Nội dung tối thiểu 100 kí tự'
              ></textarea>
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='phone' className='col-md-12 col-form-label'>
              Thông tin liên hệ
            </label>
            <div className='col-md-6'>
              <div className='input-group mb-3'>
                <input
                  id='ten_lien_he'
                  type='text'
                  name='ten_lien_he'
                  className='form-control'
                  readOnly='readOnly'
                  required=''
                  data-msg-required='Tên liên hệ'
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='phone' className='col-md-12 col-form-label'>
              Điện thoại
            </label>
            <div className='col-md-6'>
              <div className='input-group mb-3'>
                <input
                  id='phone'
                  type='number'
                  name='phone'
                  className='form-control'
                  readOnly='readOnly'
                  required=''
                  data-msg-required='Số điện thoại'
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='giachothue' className='col-md-12 col-form-label'>
              Giá cho thuê
            </label>
            <div className='col-md-6'>
              <div className='input-group'>
                <input
                  id='giachothue'
                  name='gia'
                  pattern='[0-9.]+'
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                  readOnly={who.isModerator === true ? 'readOnly' : ''}
                  type='text'
                  className='form-control'
                  required=''
                  data-msg-required='Bạn chưa nhập giá phòng'
                  data-msg-min='Giá phòng chưa đúng'
                />
                <div className='input-group-append'>
                  <select className='form-control' name='don_vi' id='don_vi'>
                    <option value='0'>đồng/tháng</option>
                    <option value='1'>đồng/m2/tháng</option>
                  </select>
                </div>
              </div>
              <small className='form-text text-muted'>
                Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000
              </small>
            </div>
            <label
              htmlFor='text_giachothue'
              id='text_giachothue'
              className='col-sm-12 control-label'
              style={{ color: 'red' }}
            ></label>
          </div>
          <div className='form-group row'>
            <label htmlFor='post_acreage' className='col-md-12 col-form-label'>
              Diện tích
            </label>
            <div className='col-md-6'>
              <div className='input-group mb-3'>
                <input
                  id='post_acreage'
                  type='number'
                  attern='[0-9.]+'
                  name='dien_tich'
                  max='1000'
                  readOnly={who.isModerator === true ? 'readOnly' : ''}
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className='form-control'
                  required=''
                  data-msg-required='Bạn chưa nhập diện tích'
                />
                <div className='input-group-append'>
                  <span className='input-group-text'>
                    m<sup>2</sup>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='form-group row mt-5'>
            <div className='col-md-12'>
              <h3>Hình ảnh</h3>
            </div>
          </div>
          <div className='form-group row'>
            <div className='col-md-12'>
              <p>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</p>
              <div className='form-group'></div>
              <div
                className='list_photos row dropzone-previews'
                id='list-photos-dropzone-previews'
              ></div>
              <div id='tpl' style={{ display: 'none' }}>
                <div className='photo_item col-md-2 col-3'>
                  <div className='photo'>
                    <img data-dz-thumbnail='' />
                  </div>
                  <div className='dz-progress'>
                    <span
                      className='dz-upload'
                      data-dz-uploadprogress=''
                    ></span>
                  </div>
                  <div className='bottom clearfix'>
                    <span className='photo_name' data-dz-name=''></span>
                    <span className='photo_delete' data-dz-remove=''>
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
                        className='feather feather-trash-2'
                      >
                        <polyline points='3 6 5 6 21 6'></polyline>
                        <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
                        <line x1='10' y1='11' x2='10' y2='17'></line>
                        <line x1='14' y1='11' x2='14' y2='17'></line>
                      </svg>{' '}
                      Xóa
                    </span>
                  </div>
                  <input name='' value='' type='hidden' />
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              who.isAdmin
                ? 'form-group row mt-5'
                : 'form-group row mt-5 visually-hidden'
            }
          >
            <div className='col-md-4'>
              <button
                onClick={() => {
                  editPostAdminHandler()
                }}
                className='btn btn-success mb-5 btn-lg btn-block'
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                Cập nhật
              </button>
            </div>
          </div>
          <div className='form-group row'>
            <label htmlFor='post_warning' className='col-md-12 col-form-label'>
              Từ chối duyệt {'('}nếu có{')'}:
            </label>
            <div className='col-md-12 d-flex align-items-center'>
              <textarea
                className='form-control'
                name='noi_dung'
                id='post_warning'
                placeholder='Lý do từ chối duyệt'
                rows='5'
                required=''
                value={warningComment}
                onChange={(e) => setWarningComment(e.target.value)}
              ></textarea>
              <div className='col-md-2 ms-3'>
                <button
                  onClick={() => {
                    reportPostHandler()
                  }}
                  data-bs-dismiss='modal'
                  aria-label='Close'
                  className='btn btn-warning btn-lg btn-block'
                  disabled={unapprovedPostLoading ? true : false}
                >
                  Từ chối duyệt
                </button>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <button
              onClick={() => {
                approvePostHandler()
              }}
              data-bs-dismiss='modal'
              aria-label='Close'
              className='btn btn-success mt-4 btn-lg btn-block'
              disabled={unapprovedPostLoading ? true : false}
            >
              Duyệt tin
            </button>
          </div>
        </div>
        <div className='col-md-4'>
          <MapD direction={addressAbsolute} useDirect={false} />

          <div
            className='card mb-5'
            style={{
              color: '#856404',
              backgroundColor: '#fff3cd',
              borderColor: '#ffeeba',
            }}
          >
            <div className='card-body'>
              <h4 className='card-title'>Lưu ý khi đăng tin</h4>
              <ul>
                <li style={{ listStyleType: 'square', marginLeft: '15px' }}>
                  Nội dung phải viết bằng tiếng Việt có dấu
                </li>
                <li style={{ listStyleType: 'square', marginLeft: '15px' }}>
                  Tiêu đề tin không dài quá 100 kí tự
                </li>
                <li style={{ listStyleType: 'square', marginLeft: '15px' }}>
                  Các bạn nên điền đầy đủ thông tin vào các mục để tin đăng có
                  hiệu quả hơn.
                </li>
                <li style={{ listStyleType: 'square', marginLeft: '15px' }}>
                  Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn,
                  hãy sửa vị trí tin rao của bạn trên bản đồ bằng cách kéo icon
                  tới đúng vị trí của tin rao.
                </li>
                <li style={{ listStyleType: 'square', marginLeft: '15px' }}>
                  Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều lần
                  so với tin rao không có ảnh. Hãy đăng ảnh để được giao dịch
                  nhanh chóng!
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailPostModal
