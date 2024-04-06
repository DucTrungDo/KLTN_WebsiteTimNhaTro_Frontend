import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { verifyRegister } from '../../actions/userActions'

const VerifyRegister = () => {
  const [otp, setOtp] = useState('')
  const { user, loading } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(verifyRegister(user.email, otp))

    navigate('/login')
  }

  return (
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VerifyRegister
