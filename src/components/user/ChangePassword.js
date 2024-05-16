import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import Cookies from 'js-cookie'
import { updatePassword, clearErrors } from '../../actions/userActions'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'

const ChangePassword = () => {
  const token = Cookies.get('accessToken')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const navigate = useNavigate()
  const alert = useAlert()
  const dispatch = useDispatch()

  const { error, isUpdated, loading } = useSelector((state) => state.user)

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (isUpdated) {
      alert.success('Password updated')
      navigate('/user/profile')

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      })
    }
  }, [dispatch, alert, error, navigate, isUpdated])

  const submitHandler = (e) => {
    e.preventDefault()

    if (oldPassword.trim() === '') {
      alert.error('Vui lòng nhập mật khẩu cũ!')
    } else if (newPassword.trim() === '') {
      alert.error('Vui lòng nhập mật khẩu mới!')
    } else {
      dispatch(updatePassword(token, oldPassword, newPassword))
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
          <li className='breadcrumb-item'>
            <Link to='/user/dashboard' className='text-decoration-none'>
              Cập nhật thông tin cá nhân
            </Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Đổi mật khẩu
          </li>
        </ol>
      </nav>
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
        <h1 className='h2'>Đổi mật khẩu</h1>
      </div>
      <form onSubmit={submitHandler}>
        <div className='row mt-5 mb-3'>
          <label
            htmlFor='old_password'
            className='col-md-2 offset-md-2 col-form-label'
          >
            Mật khẩu cũ
          </label>
          <div className='col-md-6'>
            <input
              type='password'
              className='form-control'
              id='old_password'
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className='row mb-3'>
          <label
            htmlFor='new_password'
            className='col-md-2 offset-md-2 col-form-label'
          >
            Mật khẩu mới
          </label>
          <div className='col-md-6'>
            <input
              type='password'
              className='form-control'
              id='new_password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
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
              Cập nhật
            </button>
          </div>
        </div>
        <input type='hidden' name='user_id' defaultValue='138665' />
      </form>
    </div>
  )
}

export default ChangePassword
