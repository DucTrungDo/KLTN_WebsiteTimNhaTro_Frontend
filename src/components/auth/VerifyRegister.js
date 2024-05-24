import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  verifyRegister,
  resendOtpRegister,
  clearErrors,
} from '../../actions/userActions'
import { useAlert } from 'react-alert'
import Loader from '../layout/Loader'

const VerifyRegister = () => {
  const [otp, setOtp] = useState('')
  const { message, isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()
  const { email } = useParams()
  const user = useSelector((state) => state.auth.user || {})
  const { isAdmin, isModerator } = user

  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        navigate('/admin/dashboard')
      } else if (isModerator) {
        navigate('/moderator/dashboard')
      } else {
        navigate('/')
      }
    }

    if (!loading) {
      // Nếu nhập opt sai sẽ hiện thông báo lỗi và phải nhập lại
      if (error === 'Verified code is incorrect') {
        alert.error(error)
        return
      } else if (message === 'Mail sent, please verify email') {
        // Trường hợp tài khoản chưa có người đăng ký sau khi bấm đăng ký tài khoản => gửi opt qua mail và xác nhận gửi mail thành công
        alert.success(message)
      } else if (message !== 'Email verified') {
        // Trường hợp tài khoản đã có người đăng ký sau khi bấm đăng ký tài khoản hoặc chưa yêu cầu gửi otp mà đã truy cập /verify_register => chuyển lại về trang register
        if (
          error === 'Email is already registered' ||
          error === 'Phone is already registered'
        ) {
          navigate('/register')
        }
        if (
          error === 'Email is already verified' ||
          error === 'Email not found' ||
          error === 'User not register account'
        ) {
          navigate('/resend-otp')
        }
        // Trường hợp người dùng muốn xác thực cho một email nào đó
        if (email) {
          return
        }
      } else {
        // Trường hợp verify otp thành công => chuyển về trang login để đăng nhập
        navigate('/login')
        alert.success(message)
      }
    }

    if (error && error !== 'Request failed with status code 401') {
      if (error !== 'Verified code is incorrect') {
        alert.error(error)
      }
      dispatch(clearErrors())
    }
  }, [dispatch, loading, message, alert, isAuthenticated, error, navigate])

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (!isValidEmail(email)) {
      alert.error('Email không hợp lệ!')
    } else if (otp.trim() === '') {
      alert.error('Vui lòng nhập OTP!')
    } else dispatch(verifyRegister(email, otp))
  }

  const resendOtpHandler = () => {
    if (!isValidEmail(email)) {
      alert.error('Email không hợp lệ!')
    } else {
      dispatch(resendOtpRegister(email))
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className='bg-light p-3 p-md-4 p-xl-5'>
          <div className='container'>
            <div className='row'>
              <div className='bg-gradient col-12 col-md-6 bsb-tpl-bg-platinum'>
                <div className='d-flex flex-column justify-content-between h-100 p-3 p-md-4 p-xl-5'>
                  <img
                    className='img-fluid rounded mx-auto my-4'
                    loading='lazy'
                    src='./images/loginlogo.png'
                    width='245'
                    height='80'
                    alt='BootstrapBrain Logo'
                  />
                  <hr className='border-primary-subtle mb-4' />
                  <h2 className='h1 mb-4'>
                    Discover Ideal Accommodations Quickly and Conveniently.
                  </h2>
                  <p className='lead mb-5'>
                    We support you in searching and posting according to your
                    requirements.
                  </p>
                  <div className='text-endx'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='48'
                      height='48'
                      fill='currentColor'
                      className='bi bi-grip-horizontal'
                      viewBox='0 0 16 16'
                    >
                      <path d='M2 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' />
                    </svg>
                  </div>
                  <p className='mb-0'>
                    Đã có tài khoản?{' '}
                    <Link
                      to='/login'
                      className='link-secondary text-decoration-none'
                    >
                      Đăng nhập ngay!
                    </Link>
                  </p>
                </div>
              </div>
              <div className='shadow-lg col-12 col-md-6 bsb-tpl-bg-lotion'>
                <div className='p-3 p-md-4 p-xl-5'>
                  <div className='row'>
                    <div className='col-12'>
                      <div className='mb-5'>
                        <h3>Xác thực đăng ký</h3>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={submitHandler}>
                    <div className='row gy-3 gy-md-4 overflow-hidden'>
                      <div className='col-12'>
                        <label htmlFor='otp' className='form-label'>
                          Nhập OTP đã gửi qua mail
                          <span className='text-danger'>*</span>
                        </label>
                        <input
                          type='text'
                          className='form-control'
                          name='otp'
                          id='otp'
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          required
                        />
                      </div>
                      <div className='col-12'>
                        <div className='d-grid'>
                          <button
                            className='btn bsb-btn-xl btn-primary'
                            type='submit'
                          >
                            Xác nhận
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className='row'>
                    <div className='col-12'>
                      <div className='mt-3 text-end'>
                        <div
                          className='link-secondary text-decoration-none'
                          role='button'
                          onClick={() => resendOtpHandler()}
                        >
                          Gửi lại mã xác thực
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default VerifyRegister
