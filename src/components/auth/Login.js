import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import Loader from '../layout/Loader'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { login, clearErrors } from '../../actions/userActions'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const alert = useAlert()
  const dispatch = useDispatch()
  const { isAuthenticated, error, loading, token } = useSelector(
    (state) => state.auth
  )
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
      if (Cookies.get('accessToken') == undefined) {
        Cookies.set('accessToken', token)
      }
    }

    if (error && error !== 'Request failed with status code 401') {
      alert.error(error)
      dispatch(clearErrors())
    }
  }, [dispatch, alert, isAuthenticated, error, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
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
                    src='images/loginlogo.png'
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
                    Chưa có tài khoản?{' '}
                    <Link
                      to='/register'
                      className='link-secondary text-decoration-none'
                    >
                      Đăng ký ngay!
                    </Link>
                  </p>
                </div>
              </div>
              <div className='shadow-lg col-12 col-md-6 bsb-tpl-bg-lotion'>
                <div className='p-3 p-md-4 p-xl-5'>
                  <div className='row'>
                    <div className='col-12'>
                      <div className='mb-5'>
                        <h3>Đăng nhập</h3>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={submitHandler}>
                    <div className='row gy-3 gy-md-4 overflow-hidden'>
                      <div className='col-12'>
                        <label htmlFor='email' className='form-label'>
                          Email <span className='text-danger'>*</span>
                        </label>
                        <input
                          type='email'
                          className='form-control'
                          name='email'
                          id='email'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className='col-12'>
                        <label htmlFor='password' className='form-label'>
                          Mật khẩu <span className='text-danger'>*</span>
                        </label>
                        <input
                          type='password'
                          className='form-control'
                          name='password'
                          id='password'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className='col-12'>
                        <div className='d-grid'>
                          <button
                            className='btn bsb-btn-xl btn-primary'
                            type='submit'
                          >
                            Đăng nhập
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className='d-flex justify-content-between'>
                    <div className='col-6'>
                      <div className='mt-5 text-start'>
                        <Link
                          to='/resend-otp'
                          className='link-secondary text-decoration-none'
                        >
                          Chưa xác thực tài khoản?
                        </Link>
                      </div>
                    </div>
                    <div className='col-6'>
                      <div className='mt-5 text-end'>
                        <Link
                          to='/forgot_password'
                          className='link-secondary text-decoration-none'
                        >
                          Quên mật khẩu
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* <div className='row'>
                      <div className='col-12'>
                        <p className='my-4'>Hoặc đăng nhập với</p>
                        <div className='d-flex gap-3 flex-column flex-xl-row'>
                          <a
                            href='#!'
                            className='btn bsb-btn-xl btn-outline-primary'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='16'
                              height='16'
                              fill='currentColor'
                              className='bi bi-google'
                              viewBox='0 0 16 16'
                            >
                              <path d='M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z' />
                            </svg>
                            <span className='ms-2 fs-6'>Google</span>
                          </a>
                          <a
                            href='#!'
                            className='btn bsb-btn-xl btn-outline-primary'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='16'
                              height='16'
                              fill='currentColor'
                              className='bi bi-facebook'
                              viewBox='0 0 16 16'
                            >
                              <path d='M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z' />
                            </svg>
                            <span className='ms-2 fs-6'>Facebook</span>
                          </a>
                          <a
                            href='#!'
                            className='btn bsb-btn-xl btn-outline-primary'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='16'
                              height='16'
                              fill='currentColor'
                              className='bi bi-twitter'
                              viewBox='0 0 16 16'
                            >
                              <path d='M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z' />
                            </svg>
                            <span className='ms-2 fs-6'>Twitter</span>
                          </a>
                        </div>
                      </div>
                    </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default Login
