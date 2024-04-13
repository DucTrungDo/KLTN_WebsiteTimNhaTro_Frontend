import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
  const [avatarPreview, setAvatarPreview] = useState(
    '/images/default_avatar.jpg'
  )
  // Xử lý sự kiện khi người dùng chọn ảnh mới
  const handleAvatarChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarPreview(e.target.result)
        // setIsAvatarSelected(true) // Đánh dấu là đã chọn ảnh mới
        document.querySelector('.remove-image').classList.add('upload_done')
      }
      reader.readAsDataURL(file)
    }
  }

  // Xử lý sự kiện khi người dùng chọn xóa ảnh
  const handleRemoveAvatar = (event) => {
    event.preventDefault()
    setAvatarPreview('/images/default_avatar.jpg') // Đặt lại ảnh đại diện ban đầu
    // setIsAvatarSelected(false) // Đánh dấu là không còn ảnh đại diện nữa
    document.querySelector('.remove-image').classList.remove('upload_done')
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
      <form
        className='js-form-submit-data'
        action='#'
        data-action-url='https://phongtro123.com/api/user/update/profile'
        method='POST'
        noValidate='novalidate'
      >
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
              defaultValue='#138665'
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
              type='phone'
              className='form-control'
              id='user_phone'
              defaultValue='0397260965'
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
              defaultValue='Đỗ Trung Đức'
              placeholder='Ex: Nguyễn Văn A'
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
              className='form-control'
              id='user_email'
              name='email'
              defaultValue=''
              placeholder=''
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
              defaultValue='0397260965'
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
              defaultValue=''
              placeholder=''
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
              to='/change-password'
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
                    onChange={handleAvatarChange}
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
            <button type='submit' className='btn btn-primary btn-lg mb-2 w-100'>
              Lưu &amp; Cập nhật
            </button>
          </div>
        </div>
        <input type='hidden' name='user_id' defaultValue='138665' />
      </form>
    </div>
  )
}

export default Profile
