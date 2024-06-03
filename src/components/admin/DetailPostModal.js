import axios from 'axios'
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
import React, { useState, useEffect, useCallback } from 'react'
import ImageUploading from 'react-images-uploading'
import { useDropzone } from 'react-dropzone'
import { useAlert } from 'react-alert'
import Cookies from 'js-cookie'
import MapD from '../googleMap/MapD'
import {
  getModeratorPosts,
  approvePost,
  reportViolatingPost,
} from '../../actions/postActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import {
  faTrashCan,
  faWindowRestore,
} from '@fortawesome/free-regular-svg-icons'
import {
  UPDATE_ADMIN_POST_RESET,
  MODERATOR_APPROVE_POST_RESET,
  MODERATOR_REPORT_POST_RESET,
} from '../../constants/postConstants'
import Alert from 'react-bootstrap/Alert'
import Loader from '../layout/Loader'

const DetailPostModal = ({
  post,
  setCurrentPage,
  setFilterData,
  whatList,
  setShowModal,
}) => {
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
  const [gender, setGender] = useState('')
  const [provinceName, setProvinceName] = useState('')
  const [districtName, setDistrictName] = useState('')
  const [wardName, setWardName] = useState('')

  const inputRef = React.useRef()
  const [source, setSource] = React.useState({ data: '', url: '' })
  const [images, setImages] = React.useState([])
  const maxNumber = 10

  const [showInfoLost, setShowInfoLost] = useState(false)
  const [showVideoSizeWaring, setShowVideoSizeWaring] = useState(false)
  const [fetchDataInProgress, setFetchDataInProgress] = useState(false)
  const [fileInputKey, setFileInputKey] = useState(Date.now())
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
  const { loading, error, isSuccess } = useSelector((state) => state.postEdit)
  const { user } = useSelector((state) => state.user)
  const { user: who } = useSelector((state) => state.auth)
  const {
    loading: moderatorPostLoading,
    isApproved,
    isReported,
    error: moderatorPostError,
  } = useSelector((state) => state.moderatorPost)
  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
      setShowModal(false)
    }

    if (moderatorPostError) {
      alert.error(moderatorPostError)
      dispatch(clearErrors())
      setShowModal(false)
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
      setShowModal(false)
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
        dispatch(getModeratorPosts(token, 1, resetFilterModerator))
      }

      setFilterData(resetFilterModerator)
      setCurrentPage(1)
      setShowModal(false)
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
        dispatch(getModeratorPosts(token, 1, resetFilterModerator))
      }
      setFilterData(resetFilterModerator)
      setCurrentPage(1)
      setShowModal(false)
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
    setUserName(post.userId?.name)
    setUserPhone(post.userId?.phone)
    if (JSON.stringify(post) !== '{}') {
      fetchDataInitialization()
    }

    if (post !== undefined && JSON.stringify(post) !== '{}') {
      let imagesformat = []
      post.images.forEach((link, index) => {
        imagesformat.push({
          data_url: link,
          file: null,
        })
      })
      setImages(imagesformat)
    }
    setSource({
      data: '',
      url: post.video,
    })
    setWarningComment('')
  }, [post])

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
  // images and video functions
  const handleFileChange = (event) => {
    try {
      const file = event.target.files[0]
      const sizeInBytes = file.size
      const sizeInMB = sizeInBytes / (1024 * 1024)
      if (sizeInMB > 400) {
        setShowVideoSizeWaring(true)
        setTimeout(() => {
          setShowVideoSizeWaring(false)
        }, 1500)
      } else {
        const url = URL.createObjectURL(file)
        setSource({ data: file, url: url })
      }
    } catch (error) {
      console.log(error)
    }
  }
  // kéo thả cái video
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    const sizeInBytes = file.size
    const sizeInMB = sizeInBytes / (1024 * 1024)
    if (sizeInMB > 400) {
      setShowVideoSizeWaring(true)
      setTimeout(() => {
        setShowVideoSizeWaring(false)
      }, 5000)
    } else {
      const url = URL.createObjectURL(file)
      setSource({ data: file, url: url })
    }
  }, [])
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop })
  //kéo thả video

  function DeleteVideoChoise() {
    setFileInputKey(Date.now())
    setSource({ data: '', url: '' })
  }
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList)
    console.log(imageList)
  }
  // images and video functions
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
      setShowInfoLost(true)
      setTimeout(() => {
        setShowInfoLost(false)
      }, 1500)
    } else {
      const formData = new FormData()
      formData.append('address[city]', address.city)
      formData.append('address[district]', address.district)
      formData.append('address[ward]', address.ward)
      formData.append('address[street]', address.street)
      formData.append('area', area)
      formData.append('price', price)
      formData.append('categoryId', category)
      formData.append('description', description)
      formData.append('title', title)
      formData.append('renters', gender)
      images.forEach((image, index) => {
        if (image.data_url.includes('firebasestorage')) {
          formData.append(`images[${index}]`, image.data_url)
          console.log(image.data_url)
        } else {
          formData.append(`imageFiles`, image.file)
          console.log(image.file)
        }
      })
      if (source.data !== '') {
        formData.append('videoFile', source.data)
      } else {
        if (source.url.includes('firebasestorage')) {
          formData.append('video', source.url)
        }
      }
      const token = Cookies.get('accessToken')
      dispatch(editPostAdmin(token, slug, formData))
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
    <>
      {loading ? (
        <Loader></Loader>
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
              <div className='form-group row mt-3'>
                <label htmlFor='post_cat' className='col-md-12 col-form-label'>
                  Đối tượng cho thuê
                </label>
                <div className='col-md-6'>
                  <select
                    id='province_id'
                    name='province_id'
                    className='form-control js-select-tinhthanhpho select2-hidden-accessible'
                    required=''
                    data-msg-required='Chưa chọn Tỉnh/TP'
                    tabIndex='-1'
                    aria-hidden='true'
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value=''>Chọn đối tượng cho thuê</option>
                    <option value='all'>Tất cả</option>
                    <option value='male'>Nam</option>
                    <option value='female'>Nữ</option>
                  </select>
                </div>
              </div>
              <div className='form-group row'>
                <label
                  htmlFor='post_title'
                  className='col-md-12 col-form-label'
                >
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
                <label
                  htmlFor='post_content'
                  className='col-md-12 col-form-label'
                >
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
                <label
                  htmlFor='giachothue'
                  className='col-md-12 col-form-label'
                >
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
                      <select
                        className='form-control'
                        name='don_vi'
                        id='don_vi'
                      >
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
                <label
                  htmlFor='post_acreage'
                  className='col-md-12 col-form-label'
                >
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
                  <p className={who.isModerator === true ? 'd-none' : ''}>
                    Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn:{' '}
                    <span className='text-danger'>
                      Lưu ý tối đa chỉ đăng 10 ảnh
                    </span>
                  </p>
                  <div className='form-group'></div>
                  <div
                    className='list_photos row dropzone-previews'
                    id='list-photos-dropzone-previews'
                  >
                    <div className='App'>
                      <ImageUploading
                        multiple
                        value={images}
                        onChange={onChange}
                        maxNumber={maxNumber}
                        dataURLKey='data_url'
                        acceptType={['jpg', 'png']}
                      >
                        {({
                          imageList,
                          onImageUpload,
                          onImageRemoveAll,
                          onImageUpdate,
                          onImageRemove,
                          isDragging,
                          dragProps,
                        }) => (
                          // write your building UI
                          <div className='upload__image-wrapper row justify-content-center'>
                            <button
                              type='button'
                              className={
                                who.isModerator === true
                                  ? 'bg-light rounded-2 p-5 col-md-6 w-100 h-100 d-none'
                                  : 'bg-light rounded-2 p-5 col-md-6 w-100 h-100'
                              }
                              style={{
                                color: isDragging ? 'red' : undefined, // undefined để bỏ qua thuộc tính nếu không kéo
                                borderStyle: 'dashed',
                              }}
                              onClick={onImageUpload}
                              {...dragProps}
                            >
                              <span className='text-primary'>
                                Kéo & thả ảnh hoặc chọn ảnh từ{' '}
                              </span>
                              <span className='text-muted'>trình duyệt</span>
                              <div>
                                <FontAwesomeIcon
                                  style={{
                                    height: '50%',
                                    width: '20%',
                                  }}
                                  className='mt-2 text-primary '
                                  icon={faCloudArrowUp}
                                />
                              </div>
                            </button>
                            &nbsp;
                            <button
                              type='button'
                              onClick={onImageRemoveAll}
                              className={
                                who.isModerator === true
                                  ? 'col-md-6  w-100 h-100 btn btn-danger d-none'
                                  : 'col-md-6  w-100 h-100 btn btn-danger'
                              }
                            >
                              Xoá tất cả ảnh
                            </button>
                            <div className='row d-flex justify-content-left'>
                              {imageList.map((image, index) => (
                                <div
                                  key={index}
                                  className='image-item col-sm-3 m-1 text-center border '
                                  style={{
                                    height: '180px',
                                    width: '190px',
                                  }}
                                >
                                  <div className='mt-2 row  me-2 ms-2'>
                                    <div className='col'>
                                      <FontAwesomeIcon
                                        icon={faWindowRestore}
                                        onClick={() => onImageUpdate(index)}
                                        className={
                                          who.isModerator === true
                                            ? 'btn btn-light d-none'
                                            : 'btn btn-light'
                                        }
                                      />
                                    </div>
                                    <div className='col'>
                                      <FontAwesomeIcon
                                        className={
                                          who.isModerator === true
                                            ? 'btn btn-light d-none'
                                            : 'btn btn-light'
                                        }
                                        icon={faTrashCan}
                                        onClick={() => onImageRemove(index)}
                                      />
                                    </div>
                                  </div>
                                  <img
                                    src={image.data_url}
                                    alt=''
                                    className='post-images'
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </ImageUploading>
                    </div>
                  </div>
                  <div id='tpl' style={{ display: 'none' }}>
                    <div className='photo_item col-md-2 col-3 js-photo-manual'>
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
              <div className='form-group row mt-5'>
                <div className='col-md-12'>
                  <h3>Video</h3>
                </div>
              </div>
              <div className='form-group row'>
                <div className='col-md-12'>
                  <p className={who.isModerator === true ? 'd-none' : ''}>
                    Cập nhật Video
                  </p>
                  <div>
                    <div
                      {...getRootProps()}
                      type='button'
                      className={
                        who.isModerator === true
                          ? 'bg-light rounded-2 p-5 col-md-6 w-100 h-100 d-none'
                          : 'bg-light rounded-2 p-5 col-md-6 w-100 h-100'
                      }
                      style={{
                        borderStyle: 'dashed',
                      }}
                      onClick={() => inputRef.current.click()}
                    >
                      <input
                        {...getInputProps()}
                        ref={inputRef}
                        type='file'
                        onChange={handleFileChange}
                        accept='.mov,.mp4'
                        key={fileInputKey}
                      />
                      {isDragActive ? (
                        <div className='text-success text-center'>
                          Thả video vào nào
                        </div>
                      ) : (
                        <div className='text-primary text-center'>
                          Kéo & thả video vào đây{' '}
                        </div>
                      )}
                      <div className='text-center '>
                        <FontAwesomeIcon
                          style={{
                            height: '50%',
                            width: '20%',
                          }}
                          className='mt-2 text-primary text-center '
                          icon={faCloudArrowUp}
                        />
                      </div>
                    </div>
                    <Alert show={showVideoSizeWaring} variant='danger'>
                      <Alert.Heading>
                        Dung lương video cho phép chỉ là 400M
                      </Alert.Heading>
                    </Alert>
                    <button
                      type='button'
                      className={
                        who.isModerator === true
                          ? 'col-md-6 mt-3 mb-3 w-100 h-100 btn btn-danger d-none'
                          : 'col-md-6 mt-3 mb-3 w-100 h-100 btn btn-danger'
                      }
                      onClick={DeleteVideoChoise}
                    >
                      Xoá Video
                    </button>
                    {source.url !== '' ? (
                      <video
                        className='VideoInput_video'
                        width='100%'
                        height='100%'
                        controls
                        src={source.url}
                      />
                    ) : null}
                  </div>
                  <div id='tpl' style={{ display: 'none' }}>
                    <div className='photo_item col-md-2 col-3 js-photo-manual'>
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
                    aria-label='Close'
                  >
                    Cập nhật
                  </button>
                </div>
                <div>
                  <Alert show={showInfoLost} variant='danger'>
                    <Alert.Heading>Nhập thiếu thông tin</Alert.Heading>
                  </Alert>
                </div>
              </div>
              <div className='form-group row'>
                <label
                  htmlFor='post_warning'
                  className='col-md-12 col-form-label'
                >
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
                      disabled={moderatorPostLoading ? true : false}
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
                  disabled={moderatorPostLoading ? true : false}
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
                      Các bạn nên điền đầy đủ thông tin vào các mục để tin đăng
                      có hiệu quả hơn.
                    </li>
                    <li style={{ listStyleType: 'square', marginLeft: '15px' }}>
                      Để tăng độ tin cậy và tin rao được nhiều người quan tâm
                      hơn, hãy sửa vị trí tin rao của bạn trên bản đồ bằng cách
                      kéo icon tới đúng vị trí của tin rao.
                    </li>
                    <li style={{ listStyleType: 'square', marginLeft: '15px' }}>
                      Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều
                      lần so với tin rao không có ảnh. Hãy đăng ảnh để được giao
                      dịch nhanh chóng!
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DetailPostModal
