import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import Cookies from 'js-cookie'

import { updateProfile, loadUser, clearErrors } from '../../actions/userActions'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'

const Profile = () => {
  const token = Cookies.get('accessToken')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [zalo, setZalo] = useState('')
  const [facebook, setFacebook] = useState('')
  const [avatar, setAvatar] = useState('')
  const [avatarPreview, setAvatarPreview] = useState('')
  const [fileInputKey, setFileInputKey] = useState(Date.now())
  const [imgFile, setImgFile] = useState(null)
  const navigate = useNavigate()
  const alert = useAlert()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth.user)
  const { error, isUpdated, loading } = useSelector((state) => state.user)

  useEffect(() => {
    if (user) {
      setName(user.name)
      setPhone(user.phone)
      setZalo(user.zalo)
      setFacebook(user.facebook)
      setAvatar(user.img)
      setAvatarPreview(user.img)
    }

    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (isUpdated) {
      alert.success('User updated successfully')
      dispatch(loadUser(token))
      navigate('/user/profile')
      dispatch({
        type: UPDATE_PROFILE_RESET,
      })
    }
  }, [dispatch, alert, error, navigate, isUpdated])

  const submitHandler = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('phone', phone)
    formData.append('zalo', zalo)
    formData.append('facebook', facebook)
    formData.append('img', avatar)
    formData.append('imgFile', imgFile)

    dispatch(updateProfile(token, formData))
  }

  // Xử lý sự kiện khi người dùng chọn ảnh mới
  const handleAvatarChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarPreview(e.target.result)
        setImgFile(file) // Set the file for upload
        document.querySelector('.remove-image').classList.add('upload_done')
      }
      reader.readAsDataURL(file)
    }
  }

  // Xử lý sự kiện khi người dùng chọn xóa ảnh
  const handleRemoveAvatar = (event) => {
    event.preventDefault()
    setAvatarPreview(`${user.img}`) // Đặt lại ảnh đại diện ban đầu
    setImgFile(null) // Clear file input
    document.querySelector('.remove-image').classList.remove('upload_done')
    setFileInputKey(Date.now()) // Reset the file input
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
            Cập nhật thông tin cá nhân
          </li>
        </ol>
      </nav>
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
        <h1 className='h2'>Cập nhật thông tin cá nhân</h1>
      </div>
      <form onSubmit={submitHandler}>
        <div className='row mt-5 mb-3'>
          <label
            htmlFor='user_id'
            className='col-md-2 offset-md-2 col-form-label'
          >
            Mã thành viên
          </label>
          <div className='col-md-6'>
            <input
              type='text'
              className='form-control disable'
              id='user_id'
              defaultValue={user._id}
              readOnly
            />
          </div>
        </div>
        <div className='row mb-3'>
          <label
            htmlFor='user_phone'
            className='col-md-2 offset-md-2 col-form-label'
          >
            Số điện thoại
          </label>
          <div className='col-md-6'>
            <input
              type='text'
              className='form-control disable'
              id='user_phone'
              defaultValue={user.phone}
              readOnly
            />
          </div>
        </div>
        <div className='row mb-3'>
          <label
            htmlFor='user_name'
            className='col-md-2 offset-md-2 col-form-label'
          >
            Tên hiển thị
          </label>
          <div className='col-md-6'>
            <input
              type='text'
              className='form-control'
              id='user_name'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className='row mb-3'>
          <label
            htmlFor='user_email'
            className='col-md-2 offset-md-2 col-form-label'
          >
            Email
          </label>
          <div className='col-md-6'>
            <input
              type='text'
              className='form-control disable'
              id='user_email'
              name='email'
              defaultValue={user.email}
              readOnly
            />
          </div>
        </div>
        <div className='row mb-3'>
          <label
            htmlFor='user_zalo'
            className='col-md-2 offset-md-2 col-form-label'
          >
            Số Zalo
          </label>
          <div className='col-md-6'>
            <input
              type='phone'
              className='form-control'
              id='user_zalo'
              name='user_zalo'
              value={zalo && zalo !== 'undefined' ? zalo : ''}
              onChange={(e) => setZalo(e.target.value)}
            />
          </div>
        </div>
        <div className='row'>
          <label
            htmlFor='user_facebook'
            className='col-md-2 offset-md-2 col-form-label'
          >
            Facebook
          </label>
          <div className='col-md-6'>
            <input
              type='text'
              className='form-control'
              id='user_facebook'
              name='user_facebook'
              value={facebook && facebook !== 'undefined' ? facebook : ''}
              onChange={(e) => setFacebook(e.target.value)}
            />
          </div>
        </div>
        <div className='row mt-5'>
          <label
            htmlFor='user_password'
            className='col-md-2 offset-md-2 col-form-label'
            style={{ paddingTop: 0 }}
          >
            Mật khẩu
          </label>
          <div className='col-md-6'>
            <Link
              className='link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover'
              to='/user/change-password'
            >
              Đổi mật khẩu
            </Link>
          </div>
        </div>

        {/* Ảnh */}
        <div className='row mt-5'>
          <label
            htmlFor='user_avatar'
            className='col-md-2 offset-md-2 col-form-label'
            style={{ paddingTop: 0 }}
          >
            Ảnh đại diện
          </label>
          <div className='col-md-6'>
            <div className='user-avatar-wrapper'>
              <div className='user-avatar-upload-wrapper'>
                <div className='user-avatar-inner'>
                  <div
                    className='user-avatar-preview'
                    style={{
                      background: `url(${avatarPreview}) center / cover no-repeat`,
                    }}
                  ></div>
                </div>
                <div className='user-avatar-upload clearfix'>
                  <button className='remove-image' onClick={handleRemoveAvatar}>
                    Xóa hình này
                  </button>

                  <input
                    type='file'
                    className='btn-add-avatar'
                    multiple=''
                    accept='image/png, image/jpeg'
                    onChange={handleAvatarChange}
                    key={fileInputKey}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='row mt-5'>
          <label
            htmlFor='user_email'
            className='col-md-2 col-form-label'
          ></label>
          <div className='col-md-8'>
            <button
              type='submit'
              className='btn btn-primary btn-lg mb-2 w-100'
              disabled={loading ? true : false}
            >
              Lưu &amp; Cập nhật
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Profile
